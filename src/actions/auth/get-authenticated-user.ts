'use server'

import { eq } from 'drizzle-orm'
import { drizzleClient, tables } from '~/libs/drizzle'
import { parseObject } from '~/utils/actions'
import { getTokenData } from '~/utils/auth'

export async function getAuthenticatedUser() {
  const tokenData = await getTokenData()
  if (!tokenData) return null
  const user = await drizzleClient.query.user.findFirst({ where: eq(tables.user.email, tokenData.email) })
  if (!user) return null
  return parseObject(user)
}
