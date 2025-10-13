export enum ApiEndpoints {
  USER_ONBOARD = '/user/onboard',
}

export const CDN_API_ENDPOINTS = {
  PRIVACY_PERMISSION: (locale: string) => `/config/privacy/${locale}.json`,
}

export enum ReactQueryKeys {
  PRIVACY_PERMISSION = 'privacyPermission',
}
