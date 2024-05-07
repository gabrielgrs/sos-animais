'use server'

import schemas from '~/libs/mongoose'
import { parseObject } from '~/utils/actions'
import { getTokenData } from '~/utils/auth'

export async function getAuthenticatedUser() {
  const tokenData = await getTokenData()
  if (!tokenData) return null
  const user = await schemas.user.findOne({ email: tokenData.email })
  if (!user) return null
  return parseObject(user)
}
