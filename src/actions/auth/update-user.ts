'use server'

import schemas, { UserSchema } from '~/libs/mongoose'
import { parseObject } from '~/utils/actions'
import { getTokenData } from '~/utils/auth'

export async function updateUser({ name, phone }: Partial<UserSchema>) {
  const user = await getTokenData()
  if (!user) throw new Error('Unauthorized access')

  const updatedUser = await schemas.user.findOneAndUpdate({ email: user.email, phone }, { name }, { new: true })

  if (!updatedUser) throw new Error('Not found')
  return parseObject(updatedUser)
}
