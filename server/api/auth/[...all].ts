import { auth } from '@utils/auth'

export default defineEventHandler(async (event) => {
  try {
    return await auth.handler(toWebRequest(event))
  } catch (error: any) {
    console.error('Better Auth Handler Error:', error)
    return {
      error: 'Better Auth initialization failed',
      message: error.message,
      stack: error.stack,
    }
  }
})
