import { z } from 'zod'

/**
 * Zodの複雑なエラーオブジェクトを、
 * { [フィールド名]: "エラーメッセージ" } のシンプルな形式に変換する
 */
export const flattenErrors = (error: z.ZodError) => {
  const fieldErrors: Record<string, string> = {}

  error.issues.forEach((issue) => {
    const path = issue.path[0] as string
    if (path && !fieldErrors[path]) {
      fieldErrors[path] = issue.message
    }
  })

  return fieldErrors
}
