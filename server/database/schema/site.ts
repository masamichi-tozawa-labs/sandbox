import { relations } from 'drizzle-orm'
import { decimal, index, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { organization } from './organization'

export const site = mysqlTable(
  'site',
  {
    id: int('id').autoincrement().primaryKey(),
    organizationId: int('organization_id')
      .notNull()
      .references(() => organization.id, {
        onDelete: 'cascade',
      }),
    name: varchar('name', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }),
    latitude: decimal('latitude', { precision: 12, scale: 9 }).notNull(),
    longitude: decimal('longitude', { precision: 12, scale: 9 }).notNull(),
    radiusMeter: int('radius_meter').default(100).notNull(),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => {
    return {
      organizationIdIdx: index('organization_id_idx').on(table.organizationId),
      locationIdx: index('location_idx').on(table.latitude, table.longitude),
    }
  }
)

export const siteRelations = relations(site, ({ one }) => ({
  organization: one(organization, {
    fields: [site.organizationId],
    references: [organization.id],
  }),
}))
