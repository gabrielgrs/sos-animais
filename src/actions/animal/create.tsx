'use server'

import { drizzleClient, tables } from '~/libs/drizzle'
import { AnimalSchema } from '~/libs/drizzle/types'

export async function createAnimal(data: AnimalSchema) {
  const animal = await drizzleClient
    .insert(tables.animal)
    .values(data)
    .returning()
    .then((res) => res[0])
  if (!animal) throw new Error('Not found')

  return animal
}
