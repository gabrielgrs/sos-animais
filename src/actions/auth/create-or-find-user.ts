'use server'

import schemas from '~/libs/mongoose'
import { parseObject } from '~/utils/actions'

export async function createOrFindUser(email: string) {
  const foundUser = await schemas.user.findOne({ email })
  if (foundUser) return foundUser
  const createdUser = await schemas.user.create({ email })
  return parseObject(createdUser)
}
