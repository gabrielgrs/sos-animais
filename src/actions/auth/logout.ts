'use server'

import { cookies } from 'next/headers'

export async function logout() {
  await cookies().delete('token')
  return Promise.resolve(true)
}
