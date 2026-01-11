import { db } from '@db'
import { site } from '@db/schema'
import { insertSiteSchema } from '@domain/site'
import { flattenErrors } from '@domain/validator'

export default defineEventHandler(async (event) => {
  const session = event.context.auth
  const orgId = session?.session.activeOrganizationId

  if (!orgId) {
    throw createError({
      statusCode: 401,
      statusMessage: '所属組織が未選択です。',
    })
  }

  const result = await readValidatedBody(event, insertSiteSchema.safeParse)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: '入力内容に不備があります',
      data: {
        errors: flattenErrors(result.error),
      },
    })
  }

  const payload = result.data

  const coords = await fetchCoordinatesFromAddress(payload.address)

  try {
    const [inserted] = await db.insert(site).values({
      organizationId: Number(orgId),
      name: payload.name,
      address: payload.address,
      latitude: coords.lat.toString(),
      longitude: coords.lng.toString(),
      radiusMeter: payload.radiusMeter,
    })

    return {
      success: true,
      id: inserted.insertId,
    }
  } catch (e) {
    console.error(e)
    throw createError({ statusCode: 500, statusMessage: 'データベースへの保存に失敗しました' })
  }
})
