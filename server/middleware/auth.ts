export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api/auth')) return

  const session = await auth.api.getSession({ headers: event.headers })
  event.context.auth = session
})
