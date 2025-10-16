import { PrivacyPermission } from '@/api/shared.types'
import { createStore } from 'zustand'

export interface PrivacyPermissionScreenState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  allowedPermissions: PrivacyPermission[]
  setAllowedPermissions: (
    newAllowedPermissions: PrivacyPermission[] | ((cur: PrivacyPermission[]) => PrivacyPermission[]),
  ) => void
}

export function createPrivacyPermissionScreenStore() {
  return createStore<PrivacyPermissionScreenState>()((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    allowedPermissions: Object.values(PrivacyPermission).filter(Number) as PrivacyPermission[],
    setAllowedPermissions: (
      newAllowedPermissions: PrivacyPermission[] | ((cur: PrivacyPermission[]) => PrivacyPermission[]),
    ) =>
      set((state) => ({
        allowedPermissions:
          typeof newAllowedPermissions === 'function'
            ? newAllowedPermissions(state.allowedPermissions)
            : newAllowedPermissions,
      })),
  }))
}

export type PrivacyPermissionScreenStore = ReturnType<typeof createPrivacyPermissionScreenStore>
