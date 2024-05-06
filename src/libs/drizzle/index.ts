import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { zodEnvs } from '../zod/env'
import * as tables from './tables'

const queryClient = postgres(zodEnvs.DATABASE_URL)

export const drizzleClient = drizzle(queryClient, { schema: tables })
export * as tables from './tables'
