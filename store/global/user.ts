import { StateCreator } from 'zustand'
import { GlobalStore, UserSlice } from './shared.types'

export const createUserSlice: StateCreator<GlobalStore, [['zustand/persist', unknown]], [], UserSlice> = (set) => ({
  isLoggedIn: true,
  userInfo: null,
  setUserInfo: (userInfo) =>
    set({
      userInfo,
    }),
  setIsLoggedIn: (isLoggedIn) =>
    set({
      isLoggedIn,
    }),
})
