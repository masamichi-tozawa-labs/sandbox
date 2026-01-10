import { createAuthClient } from 'better-auth/vue'
import { organizationClient } from "better-auth/client/plugins"

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const authClient = createAuthClient({
    baseURL: config.public.better_auth_url,
    plugins: [
      organizationClient()
    ]
  })

  return {
    provide: {
      auth: authClient,
    },
  }
})
