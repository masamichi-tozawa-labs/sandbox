export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $auth } = useNuxtApp()

  const { data: sessionData } = await $auth.getSession()

  if (!sessionData) {
    await $auth.signIn.social({
      provider: 'google',
      callbackURL: to.fullPath,
    })
  }
})
