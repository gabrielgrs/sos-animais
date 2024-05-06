// import { NextRequest, NextResponse } from 'next/server'
// import { eq } from 'drizzle-orm'
// import { getAuthenticatedUser } from '~/actions/auth'
// import { drizzleClient, tables } from '~/libs/drizzle'
// import { s3Client } from '~/libs/s3'
// import { APP_NAME } from '~/utils/constants'

// const BUCKET_NAME = APP_NAME.toLowerCase()

// export async function convertFileToBuffer(file: File) {
//   const stream = file.stream()
//   const chunks = []

//   for await (const chunk of stream as any) {
//     chunks.push(chunk)
//   }

//   const buffer = Buffer.concat(chunks)
//   return buffer
// }

// export async function POST(req: NextRequest) {
//   try {
//     const authenticatedUser = await getAuthenticatedUser()
//     if (!authenticatedUser) return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 })

//     const formData = await req.formData()
//     const file = formData.get('file') as File

//     const buffer = await convertFileToBuffer(file)

//     const extension = file.type.split('/').at(-1)

//     if (authenticatedUser.avatar) {
//       const fileKey = authenticatedUser.avatar.split('/').at(-1)
//       await s3Client.deleteObject({ Bucket: BUCKET_NAME, Key: fileKey! }).promise()
//     }

//     const response = await s3Client
//       .upload({
//         Bucket: BUCKET_NAME,
//         Key: `${file.name}.${extension}`,
//         Body: buffer,
//         ACL: 'public-read',
//       })
//       .promise()

//     await drizzleClient.update(tables.user).set({}).where(eq(tables.user.id, authenticatedUser.id!))
//     //   await schemas.user.findOneAndUpdate({ id: authenticatedUser.id }, { avatar: response.Location })

//     return NextResponse.json({ message: 'Success', url: response.Location }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json(error, { status: 500 })
//   }
// }
