import { db } from '@db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { organization } from 'better-auth/plugins'

export const auth = betterAuth({
  baseURL: process.env.NUXT_PUBLIC_BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'mysql',
  }),
  advanced: {
    database: {
      generateId: 'serial',
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [organization()],
})
