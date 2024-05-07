import * as z from 'zod'
import { requiredField } from '~/utils/validation'

// Define the Document schema
export const documentSchema = z.object({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const userSchema = z
  .object({
    email: z.string(),
    name: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum(['USER', 'ADMIN']),
  })
  .merge(documentSchema)

export const animalSchema = z
  .object({
    user: z.any(),
    name: z.string().optional(),
    species: z.string(),
    gender: z.enum(['MALE', 'FEMALE']),
    color: z.string({ message: requiredField.message }),
    breed: z.string().optional(),
    rescue: z.object({
      date: z.date(),
      zipCode: z.string().optional(),
      city: z.string({ message: requiredField.message }),
      neighborhood: z.string({ message: requiredField.message }),
      street: z.string({ message: requiredField.message }),
      number: z.string().optional(),
      complement: z.string().optional(),
    }),
    contact: z.object({
      phone: z.string({ message: requiredField.message }),
      city: z.string().optional(),
      zipCode: z.string().optional(),
      neighborhood: z.string().optional(),
      street: z.string().optional(),
      number: z.string().optional(),
      complement: z.string().optional(),
    }),
    handedOverToOwner: z.boolean(),
    pictures: z.array(z.string()),
    observations: z.string().optional(),
  })
  .merge(documentSchema)
