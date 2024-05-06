'use server'

import { createToken } from '~/libs/jose'
import { resend } from '~/libs/resend'
import { APP_NAME } from '~/utils/constants'
import { getDomain } from '~/utils/domains'
import AuthEmail from '../../../emails/auth'
import { createOrFindUser } from './create-or-find-user'

export async function sendAuthEmail(email: string) {
  const user = await createOrFindUser(email)
  const token = await createToken({ id: user.id, email: user.email, role: user.role })

  return resend.emails.send({
    from: `${APP_NAME} Magic Link <auth@huuma.co>`,
    to: email,
    subject: 'Email with login link',
    react: AuthEmail({
      baseUrl: getDomain(),
      token,
    }),
  })
}
