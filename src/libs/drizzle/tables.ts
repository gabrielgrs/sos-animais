import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, pgEnum, timestamp, boolean } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('role', ['USER', 'ADMIN'] as const)

export const gender = pgEnum('gender', ['MALE', 'FEMALE'] as const)

export const user = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
  email: text('email').unique().notNull(),
  phone: text('phone'),
  name: text('name'),
  role: userRole('role').notNull().default('USER'),
})

export const animal = pgTable('animals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
  name: text('name'),
  species: text('species').notNull(),
  gender: gender('gender'),
  color: text('color').notNull(),
  breed: text('breed'),

  // Found
  foundDate: timestamp('found_date').notNull(),
  foundZipCode: text('found_zip_code').notNull(),
  foundCity: text('found_city').notNull(),
  foundAddress: text('rescue_zip_code'),

  // Contact
  contactPhone: text('contact_phone').notNull(),
  contactZipCode: text('contact_zip_code'),
  contactCity: text('contact_address'),
  contactAddress: text('contact_city'),
  handedOverToOwner: boolean('contact_city').notNull().default(false),

  pictures: text('pictures')
    .array()
    .$defaultFn(() => []),
  observations: text('observations'),
})
