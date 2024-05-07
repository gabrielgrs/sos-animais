'use server'

import { redirect } from 'next/navigation'
import { compare } from 'bcryptjs'
import { createToken } from '~/libs/jose'
import schemas, { UserSchema } from '~/libs/mongoose'

export async function login({ email, password }: Pick<UserSchema, 'email' | 'password'>) {
  const foundUser = await schemas.user.findOne({ email, emailConfirmed: true })
  if (!foundUser) throw new Error('Usuário não encontrado')

  const hashedPassword = await compare(password, foundUser.password)
  if (!hashedPassword) throw new Error('Usuário não encontrado.')

  const token = await createToken({ _id: foundUser._id, email: foundUser.email, role: foundUser.role })

  redirect(`/auth?token=${token}`)
}
