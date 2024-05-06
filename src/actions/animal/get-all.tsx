'use server'

import { drizzleClient } from '~/libs/drizzle'
import { FETCH_LIMIT } from '~/utils/constants'

export async function getAllAnimals(limit = FETCH_LIMIT) {
  const animals = await drizzleClient.query.animal.findMany({ limit })
  return animals
}
