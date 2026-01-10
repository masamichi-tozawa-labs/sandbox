import { createAuthClient } from 'better-auth/vue'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const authClient = createAuthClient({
    baseURL: config.public.better_auth_url,
  })

  return {
    provide: {
      auth: authClient,
    },
  }
})
