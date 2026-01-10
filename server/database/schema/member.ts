import { index, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { organization } from './organization'
import { user } from './user'

export const member = mysqlTable(
  'member',
  {
    id: int('id').autoincrement().primaryKey(),
    organizationId: int('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    userId: int('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    role: varchar('role', { length: 255 }).default('member').notNull(),
    createdAt: timestamp('created_at', { fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      memberOrganizationIdIdx: index('member_organizationId_idx').on(table.organizationId),
      memberUserIdIdx: index('member_userId_idx').on(table.userId),
    }
  }
)
