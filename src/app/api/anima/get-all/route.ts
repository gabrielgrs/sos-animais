import { NextRequest, NextResponse } from 'next/server'
import { drizzleClient } from '~/libs/drizzle'
import { FETCH_LIMIT } from '~/utils/constants'

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get('limit')) || FETCH_LIMIT

  const animals = await drizzleClient.query.animal.findMany({ limit })

  return NextResponse.json(animals, { status: 200 })
}
