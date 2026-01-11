import type { SiteCoordinates } from '@domain/site'

export const fetchCoordinatesFromAddress = async (address: string): Promise<SiteCoordinates> => {
  const config = useRuntimeConfig()
  const apiKey = config.googleMapsApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google Maps API key is not configured in runtimeConfig',
    })
  }

  // Google Geocoding API を呼び出し
  const url = `https://maps.googleapis.com/maps/api/geocode/json`

  const response = await $fetch<any>(url, {
    query: {
      address: address,
      key: apiKey,
      language: 'ja',
    },
  })

  // Google API 独自のエラーレスポンスをハンドリング
  if (response.status !== 'OK') {
    const errorMap: Record<string, string> = {
      ZERO_RESULTS: '指定された住所の場所が見つかりませんでした。',
      OVER_QUERY_LIMIT: 'APIの利用制限に達しました。',
      REQUEST_DENIED: 'APIキーが無効、またはGeocoding APIが有効化されていません。',
      INVALID_REQUEST: '住所が入力されていません。',
    }

    throw createError({
      statusCode: 400,
      statusMessage: errorMap[response.status] || `Geocoding error: ${response.status}`,
    })
  }

  // 最初の候補の座標を返す
  const location = response.results[0].geometry.location
  return {
    lat: location.lat,
    lng: location.lng,
  }
}
