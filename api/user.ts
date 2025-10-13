import { apiClient } from '@/lib/apiClient'
import { ApiEndpoints } from '@/lib/constants'
import { UserOnboardRequest } from './shared.types'

export function userOnboard(onboardRequest: UserOnboardRequest) {
  return apiClient.post(ApiEndpoints.USER_ONBOARD, onboardRequest)
}
