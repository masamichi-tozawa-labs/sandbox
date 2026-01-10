import { relations } from 'drizzle-orm'
import { index, int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { user } from './user'

export const session = mysqlTable(
  'session',
  {
    id: int('id').autoincrement().primaryKey(),
    expiresAt: timestamp('expires_at', { fsp: 3 }).notNull(),
    token: varchar('token', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: int('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      sessionUserIdIdx: index('session_userId_idx').on(table.userId),
    }
  }
)

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))
