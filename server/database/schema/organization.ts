import { relations } from 'drizzle-orm'
import { int, mysqlTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'
import { invitation } from './invitation'
import { member } from './member'

export const organization = mysqlTable(
  'organization',
  {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    logo: text('logo'),
    createdAt: timestamp('created_at', { fsp: 3 }).notNull(),
    metadata: text('metadata'),
  },
  (table) => {
    return {
      organizationSlugUidx: uniqueIndex('organization_slug_uidx').on(table.slug),
    }
  }
)

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member),
  invitations: many(invitation),
}))
