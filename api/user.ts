import { apiClient } from '@/lib/apiClient'
import { API_ENDPOINTS } from '@/lib/constants'
import { UserOnboardRequest, UserOnboardResponse } from './shared.types'

export async function userOnboard(onboardRequest: UserOnboardRequest): Promise<UserOnboardResponse> {
  const res = await apiClient.post<UserOnboardResponse>(API_ENDPOINTS.USER_ONBOARD, onboardRequest)
  return res.data
}
