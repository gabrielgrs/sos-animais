import * as z from 'zod'
import * as schemas from '~/libs/zod/schemas'

export type UserSchema = z.infer<typeof schemas.userSchema>
export type AnimalSchema = z.infer<typeof schemas.animalSchema>
