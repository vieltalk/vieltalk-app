import { cdnApiClient } from '@/lib/apiClient'
import { CDN_API_ENDPOINTS } from '@/lib/constants'
import { i18n } from '@lingui/core'
import { PrivacyPermissionItem } from './shared.types'

export async function getPrivacyPermission() {
  try {
    const res = await cdnApiClient.get<PrivacyPermissionItem[]>(CDN_API_ENDPOINTS.PRIVACY_PERMISSION(i18n.locale))

    return res.data.sort((a, b) => a.sort - b.sort)
  } catch {
    return []
  }
}
