import { ReactElement } from 'react'
import { randomUUID } from 'crypto'
import { Resend } from 'resend'
import { zodEnvs } from '../zod/env'

export const resend = new Resend(zodEnvs.RESEND_KEY)

export function sendEmail(to: string, subject: string, react: ReactElement) {
  return resend.emails.send({
    from: 'noreply@huuma.co',
    to: [to],
    subject,
    react,
    headers: {
      'X-Entity-Ref-ID': randomUUID(),
    },
  })
}
