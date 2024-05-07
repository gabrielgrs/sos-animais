import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '~/actions/auth'
import { s3Client } from '~/libs/s3'
import { APP_NAME } from '~/utils/constants'

const BUCKET_NAME = APP_NAME.toLowerCase().replace(' ', '-')

export async function convertFileToBuffer(file: File) {
  const stream = file.stream()
  const chunks = []

  for await (const chunk of stream as any) {
    chunks.push(chunk)
  }

  const buffer = Buffer.concat(chunks)
  return buffer
}

export async function POST(req: NextRequest) {
  try {
    const authenticatedUser = await getAuthenticatedUser()
    if (!authenticatedUser) return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 })

    const formData = await req.formData()
    const size = Number(formData.get('size') ?? 0)

    const storedFiles = await Promise.all(
      Array.from({ length: size }).map(async (_, index) => {
        const file = formData.get(`file.${index}`) as File

        const buffer = await convertFileToBuffer(file)

        return s3Client
          .upload({
            Bucket: BUCKET_NAME,
            Key: file.name,
            Body: buffer,
            ACL: 'public-read',
          })
          .promise()
      }),
    )

    const urls = storedFiles.map((item) => item.Location)

    return NextResponse.json({ message: 'Success', urls }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
