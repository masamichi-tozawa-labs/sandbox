import { index, int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const verification = mysqlTable(
  'verification',
  {
    id: int('id').autoincrement().primaryKey(),
    identifier: varchar('identifier', { length: 255 }).notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at', { fsp: 3 }).notNull(),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => {
    return {
      verificationIdentifierIdx: index('verification_identifier_idx').on(table.identifier),
    }
  }
)
