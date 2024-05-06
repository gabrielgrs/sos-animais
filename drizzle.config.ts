import type { Config } from 'drizzle-kit'
import { zodEnvs } from '~/libs/zod/env'

export default {
  schema: './src/libs/drizzle/tables.ts',
  out: './src/libs/drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: zodEnvs.DATABASE_URL,
  },
} satisfies Config
