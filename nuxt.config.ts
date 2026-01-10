import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '@db': fileURLToPath(new URL('./server/database', import.meta.url)),
    '@utils': fileURLToPath(new URL('./server/utils', import.meta.url)),
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  experimental: {
    typedPages: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    public: {
      better_auth_url: '',
    },
    googleClientId: '',
    googleClientSecret: '',
  },
})
