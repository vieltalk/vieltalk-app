import { apiClient } from '@/lib/apiClient'
import { API_ENDPOINTS } from '@/lib/constants'
import { ContactSyncRequest, UserOnboardRequest, UserOnboardResponse } from './shared.types'

export async function userOnboard(onboardRequest: UserOnboardRequest): Promise<UserOnboardResponse> {
  const res = await apiClient.post<UserOnboardResponse>(API_ENDPOINTS.USER_ONBOARD, onboardRequest)
  return res.data
}

export async function contactSync(contactSyncRequest: ContactSyncRequest) {
  const res = await apiClient.post(API_ENDPOINTS.CONTACT_SYNC, contactSyncRequest)
  return res.data
}
