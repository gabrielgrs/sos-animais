import * as z from 'zod'
import { slugPattern } from '~/utils/validation'

// Define the Document schema
export const documentSchema = z.object({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const userSchema = z
  .object({
    email: z.string(),
    name: z.string(),
    avatar: z.string(),
    stripeSubscriptionId: z.string().optional(),
    stripeCustomerId: z.string(),
    role: z.enum(['USER', 'ADMIN']),
  })
  .merge(documentSchema)

export const memberSchema = z
  .object({
    user: userSchema,
    email: z.string(),
    accepted: z.boolean(),
  })
  .merge(documentSchema)

export const metadataSchema = z.record(z.union([z.string(), z.boolean(), z.number()]))

export const projectSchema = z
  .object({
    name: z.string(),
    slug: z.string().regex(slugPattern.value, { message: slugPattern.message }),
    apiKey: z.string(),
    image: z.string().optional(),
    domains: z.array(z.string()),
    creator: z.union([z.string(), userSchema]),
    members: z.array(memberSchema),
  })
  .merge(documentSchema)

export const identitySchema = z
  .object({
    email: z.string(),
    project: z.union([z.string(), projectSchema]),
    metadata: metadataSchema.optional(),
  })
  .merge(documentSchema)

export const eventSchema = z
  .object({
    name: z.string(),
    channel: z.string().regex(slugPattern.value, { message: slugPattern.message }),
    notify: z.boolean(),
    creator: z.union([z.string(), userSchema.optional()]),
    identity: z.union([z.string(), identitySchema.optional()]),
    project: z.union([z.string(), projectSchema]),
    metadata: metadataSchema.optional(),
  })
  .merge(documentSchema)

export const widgetSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    color: z.string(),
    creator: z.union([z.string(), userSchema]),
    project: z.union([z.string(), projectSchema]),
    channels: z.array(z.string()),
  })
  .merge(documentSchema)
