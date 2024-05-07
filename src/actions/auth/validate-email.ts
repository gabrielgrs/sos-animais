'use server'

import { redirect } from 'next/navigation'
import { decodeToken } from '~/libs/jose'
import schemas from '~/libs/mongoose'

export async function validateEmail(token: string) {
  const decodedToken = await decodeToken(token)
  if (!decodedToken) throw new Error('Token inválido')

  await schemas.user.findOneAndUpdate({ email: decodedToken.email }, { emailConfirmed: true }, { new: true })

  redirect(`/auth?token=${token}`)
}
