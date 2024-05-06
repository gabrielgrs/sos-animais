'use server'

import { eq } from 'drizzle-orm'
import { drizzleClient, tables } from '~/libs/drizzle'
import { parseObject } from '~/utils/actions'

export async function createOrFindUser(email: string) {
  const foundUser = await drizzleClient.query.user.findFirst({ where: eq(tables.user.email, email) })
  if (foundUser) return foundUser
  const createdUser = await drizzleClient
    .insert(tables.user)
    .values({ email })
    .returning()
    .then((res) => res[0])
  return parseObject(createdUser)
}
