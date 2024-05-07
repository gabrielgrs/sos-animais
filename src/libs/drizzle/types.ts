import * as tables from './tables'

export type UserSchema = typeof tables.user.$inferSelect
export type AnimalSchema = typeof tables.animal.$inferSelect
