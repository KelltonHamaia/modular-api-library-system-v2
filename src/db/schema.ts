import { sql } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const idHelper = {
  id: uuid()
    .primaryKey()
    .notNull()
    .default(sql`uuidv7()`),
}
export const userStatus = pgEnum('userStatus', ['ACTIVE', 'SUSPENDED'])
export const holdsStatus = pgEnum('holdsStatus', [
  'WAITING',
  'FULFILLED',
  'CANCELLED',
])

export const users = pgTable('users', {
  ...idHelper,
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique('email-unique-constraint'),
  status: userStatus().notNull(),
})

export const books = pgTable('books', {
  ...idHelper,
  title: varchar({ length: 255 }).notNull(),
  author: varchar({ length: 255 }).notNull(),
  totalCopies: integer().notNull(),
  availableCopies: integer().notNull(),
})

export const loans = pgTable('loans', {
  ...idHelper,
  loanDate: timestamp({ withTimezone: true }).notNull().defaultNow(),
  dueDate: timestamp({ withTimezone: true }).notNull(),
  returnDate: timestamp({ withTimezone: true }),
  overDue: boolean().notNull(),

  userId: uuid()
    .notNull()
    .references(() => users.id),
  bookId: uuid()
    .notNull()
    .references(() => books.id),
})

export const holds = pgTable('holds', {
  ...idHelper,
  requestedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  status: holdsStatus().notNull().default('WAITING'),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  bookId: uuid()
    .notNull()
    .references(() => books.id),
})
