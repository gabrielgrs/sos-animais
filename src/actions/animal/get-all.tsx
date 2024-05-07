'use server'

import schemas from '~/libs/mongoose'
import { FETCH_LIMIT } from '~/utils/constants'

export async function getAllAnimals(limit = FETCH_LIMIT) {
  return schemas.animal.find({ handedOverToOwner: false }).limit(limit)
}
