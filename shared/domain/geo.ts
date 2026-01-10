import type { SiteCoordinates } from '@domain/site'

/**
 * 2点間の距離(m)を計算する（ハバーサイン公式）
 */
export const calculateDistance = (pos1: SiteCoordinates, pos2: SiteCoordinates): number => {
  const R = 6371e3 // 地球の半径 (m)
  const dLat = ((pos2.lat - pos1.lat) * Math.PI) / 180
  const dLon = ((pos2.lng - pos1.lng) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((pos1.lat * Math.PI) / 180) *
      Math.cos((pos2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * 指定された半径内にターゲットが含まれるか判定する
 */
export const isWithinRange = (
  center: SiteCoordinates,
  target: SiteCoordinates,
  radiusMeter: number
): boolean => {
  return calculateDistance(center, target) <= radiusMeter
}
