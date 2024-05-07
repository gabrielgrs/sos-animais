'use server'

import schemas from '~/libs/mongoose'
import { parseObject } from '~/utils/actions'

export async function getByIdentifier(identifier: string) {
  const animal = await schemas.animal.findOne({ identifier })
  if (!animal) throw new Error('Not found')

  return parseObject(animal)
}
