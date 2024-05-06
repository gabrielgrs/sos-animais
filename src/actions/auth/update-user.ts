'use server'

import { eq } from 'drizzle-orm'
import { drizzleClient, tables } from '~/libs/drizzle'
import { UserSchema } from '~/libs/drizzle/types'
import { parseObject } from '~/utils/actions'
import { getTokenData } from '~/utils/auth'

export async function updateUser(data: Partial<UserSchema>) {
  const user = await getTokenData()
  if (!user) throw new Error('Unauthorized access')

  const updatedUser = await drizzleClient
    .update(tables.user)
    .set(data)
    .where(eq(tables.user.email, user.email))
    .returning()
    .then((res) => res[0])
  if (!updatedUser) throw new Error('Not found')
  return parseObject(updatedUser)
}
