import { apiClient } from '@/lib/apiClient'
import { API_ENDPOINTS } from '@/lib/constants'
import { UserOnboardRequest } from './shared.types'

export function userOnboard(onboardRequest: UserOnboardRequest) {
  return apiClient.post(API_ENDPOINTS.USER_ONBOARD, onboardRequest)
}
