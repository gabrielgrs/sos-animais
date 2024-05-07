import mongoose from 'mongoose'
import { zodEnvs } from '../zod/env'
import animal from './schemas/animal'
import user from './schemas/user'

export let databaseConnection: typeof mongoose | null = null

export const connectDatabase = async (): Promise<typeof mongoose> => {
  if (databaseConnection) return databaseConnection
  databaseConnection = await mongoose.set('strictQuery', true).connect(zodEnvs.MONGODB_URI)
  return databaseConnection
}

connectDatabase()

const schemas = {
  user,
  animal,
}

export * from './schemas/types'

export default schemas
