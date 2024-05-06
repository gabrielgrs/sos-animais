import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { zodEnvs } from '../zod/env'

const migrationClient = postgres(zodEnvs.DATABASE_URL, { max: 1 })

async function main() {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: './src/libs/drizzle/migrations',
    })

    await migrationClient.end()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

main()
