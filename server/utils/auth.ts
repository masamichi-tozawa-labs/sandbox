import { db } from '@db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  baseURL: useRuntimeConfig().public.better_auth_url,
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
      clientId: useRuntimeConfig().googleClientId,
      clientSecret: useRuntimeConfig().googleClientSecret,
    },
  },
})
