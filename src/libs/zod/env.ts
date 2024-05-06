import { z } from 'zod'

const envSchema = z.object({
  DOMAIN: z.string(),
  JWT_SECRET: z.string(),
  RESEND_KEY: z.string(),
  DATABASE_URL: z.string(),
  MINIO_ENDPOINT: z.string(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
})

export const zodEnvs = envSchema.parse(process.env)
