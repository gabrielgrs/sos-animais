'use server'

import { drizzleClient, tables } from '~/libs/drizzle'
import { AnimalSchema } from '~/libs/drizzle/types'
import { getTokenData } from '~/utils/auth'

export async function createAnimal(data: AnimalSchema) {
  const tokenData = await getTokenData()
  if (!tokenData) throw new Error('Unauthorized access')

  const animal = await drizzleClient
    .insert(tables.animal)
    .values({
      ...data,
      userId: tokenData.id,
      foundDate: new Date(data.foundDate),
    })
    .returning()
    .then((res) => res[0])
  if (!animal) throw new Error('Not found')

  return animal
}
