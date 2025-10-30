export interface UserOnboardRequest {
  avatar: string
  deviceId: string
  phoneNumber: string
  deviceType: string
  deviceModel: string
  osVersion: string
  appVersion: string
}

export interface PrivacyPermissionItem {
  id: PrivacyPermission
  icon: string
  title: string
  subtitle: string
  content: string
  require: boolean
  locale: string
  sort: number
}

export enum PrivacyPermission {
  PRIVACY = 1,
  CONTACTS = 2,
  NOTIFICATIONS = 3,
  LOCATION = 4,
  CAMERA = 5,
}

export interface UserOnboardResponse {
  _id: string
}
