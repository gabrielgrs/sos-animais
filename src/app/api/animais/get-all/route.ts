import { NextRequest, NextResponse } from 'next/server'
import schemas from '~/libs/mongoose'
import { FETCH_LIMIT } from '~/utils/constants'

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get('limit')) || FETCH_LIMIT

  const animals = await schemas.animal.find().limit(limit)

  return NextResponse.json(animals, { status: 200 })
}
