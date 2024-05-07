'use server'

import { hash } from 'bcryptjs'
import { createToken } from '~/libs/jose'
import schemas, { UserSchema } from '~/libs/mongoose'
import { resend } from '~/libs/resend'
import { APP_NAME } from '~/utils/constants'
import { getDomain } from '~/utils/domains'
import AuthEmail from '../../../emails/auth'

export async function register({
  password,
  email,
  name,
  phone,
}: Pick<UserSchema, 'password' | 'email' | 'name' | 'phone'>) {
  const hashedPassword = await hash(password, 10)

  const user = await schemas.user.create({
    email,
    password: hashedPassword,
    name,
    phone,
  })

  const token = await createToken({ _id: user._id, email: user.email, role: user.role })

  await resend.emails.send({
    from: `${APP_NAME} Confirmação de acesso <auth@huuma.co>`,
    to: email,
    subject: 'Confirmação de cadastro',
    react: AuthEmail({
      baseUrl: getDomain(),
      token,
    }),
  })

  return true
}
