import { defineConfig } from 'drizzle-kit'

const parseDatabaseUrl = (url: string | undefined) => {
  if (!url) {
    return {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'password',
      database: 'sandbox',
    }
  }

  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  if (!match) {
    throw new Error('Invalid DATABASE_URL format')
  }

  return {
    host: match[3],
    port: Number(match[4]),
    user: match[1],
    password: match[2],
    database: match[5],
  }
}

const dbConfig = parseDatabaseUrl(process.env.DATABASE_URL)

export default defineConfig({
  schema: './server/database/schema/index.ts',
  out: './server/database/',
  dialect: 'mysql',
  dbCredentials: dbConfig,
})
