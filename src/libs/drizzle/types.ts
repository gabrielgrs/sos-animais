import * as tables from './tables'

export type UserSchema = typeof tables.user.$inferInsert
export type AnimalSchema = typeof tables.animal.$inferSelect
