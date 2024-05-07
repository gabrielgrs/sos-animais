import * as baseSchemas from './base'

export const userInsertSchema = baseSchemas.userSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  emailConfirmed: true,
  role: true,
})
