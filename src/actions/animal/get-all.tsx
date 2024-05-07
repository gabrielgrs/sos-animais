'use server'

import schemas from '~/libs/mongoose'
import { parseObject } from '~/utils/actions'
import { FETCH_LIMIT } from '~/utils/constants'

export async function getAllAnimals(limit = FETCH_LIMIT) {
  const animals = await schemas.animal.find({ handedOverToOwner: false }).limit(limit)

  return parseObject(animals)
}
