import { site } from '@db/schema'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

// DB選択用型
export type Site = typeof site.$inferSelect

/**
 * 現場登録用のバリデーションスキーマ
 */
export const insertSiteSchema = createInsertSchema(site, {
  name: z.string().min(2, '現場名は2文字以上で入力してください。'),
  address: z.string().min(1, '住所を入力してください。'),
  radiusMeter: z.number().min(10).max(5000).default(100),
}).omit({
  id: true,
  organizationId: true,
  latitude: true,
  longitude: true,
  createdAt: true,
  updatedAt: true,
})

// 型の抽出
export type NewSite = z.infer<typeof insertSiteSchema>

// 座標型
export type SiteCoordinates = {
  lat: number
  lng: number
}
