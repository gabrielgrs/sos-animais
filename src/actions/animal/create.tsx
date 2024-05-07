'use server'

import schemas, { AnimalSchema } from '~/libs/mongoose'
import { parseObject } from '~/utils/actions'
import { getTokenData } from '~/utils/auth'

export async function createAnimal(data: AnimalSchema) {
  const tokenData = await getTokenData()
  if (!tokenData) throw new Error('Unauthorized access')

  const animal = await schemas.animal.create({
    ...data,
    userId: tokenData._id,
    foundDate: new Date(data.rescue.date),
  })

  if (!animal) throw new Error('Not found')

  return parseObject(animal)
}
