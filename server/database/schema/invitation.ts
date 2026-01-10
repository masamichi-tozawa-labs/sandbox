import { relations } from 'drizzle-orm'
import { index, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { organization } from './organization'
import { user } from './user'

export const invitation = mysqlTable(
  'invitation',
  {
    id: int('id').autoincrement().primaryKey(),
    organizationId: int('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    email: varchar('email', { length: 255 }).notNull(),
    role: varchar('role', { length: 255 }),
    status: varchar('status', { length: 255 }).default('pending').notNull(),
    expiresAt: timestamp('expires_at', { fsp: 3 }).notNull(),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    inviterId: int('inviter_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      invitationOrganizationIdIdx: index('invitation_organizationId_idx').on(table.organizationId),
      invitationEmailIdx: index('invitation_email_idx').on(table.email),
    }
  }
)

export const invitationRelations = relations(invitation, ({ one }) => ({
  organization: one(organization, {
    fields: [invitation.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [invitation.inviterId],
    references: [user.id],
  }),
}))
