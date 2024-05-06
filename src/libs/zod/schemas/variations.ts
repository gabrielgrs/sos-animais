import * as baseSchemas from './base'

export const projectInsertSchema = baseSchemas.projectSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  apiKey: true,
  domains: true,
  members: true,
  creator: true,
})

export const eventInsertSchema = baseSchemas.eventSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  project: true,
})

export const widgetInsertSchema = baseSchemas.widgetSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  project: true,
})

export const identityInsertSchema = baseSchemas.identitySchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  project: true,
})
