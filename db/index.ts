import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2'
import * as schema from './schema'

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

const connection = mysql.createConnection(dbConfig)

export const db = drizzle(connection, { schema, mode: 'default' })
