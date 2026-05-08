export const API_ENDPOINTS = {
  USER_ONBOARD: '/users/onboard',
  CONTACT_SYNC: '/contacts/sync',
}

export const CDN_API_ENDPOINTS = {
  PRIVACY_PERMISSION: (locale: string) => `/config/privacy/${locale}.json`,
}

export enum ReactQueryKeys {
  PRIVACY_PERMISSION = 'privacyPermission',
}

export enum SocketEvents {
  CONTACT_SYNCED = 'contact-synced',
  CONTACT_UNSYNCED = 'contact-unsynced',
}
