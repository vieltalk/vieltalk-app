// TODO: To be defined
interface UserInfoModel {
  id: string
}

export interface UserSlice {
  isLoggedIn: boolean
  userInfo: UserInfoModel | null
  setUserInfo: (userInfo: UserInfoModel | null) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export enum ThemeOption {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export interface ThemeSlice {
  theme: ThemeOption
  setTheme: (theme: ThemeOption) => void
}

export enum AppLanguage {
  EN = 'en',
  KM = 'km',
}

export interface LanguageSlice {
  preferredLanguage: AppLanguage
  setPreferredLanguage: (language: AppLanguage) => void
}

export type GlobalStore = UserSlice & ThemeSlice & LanguageSlice
