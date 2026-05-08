import { PrivacyPermission } from '@/api/shared.types'
import { createStore } from 'zustand'

export interface PrivacyPermissionScreenState {
  allowedPermissions: PrivacyPermission[]
  setAllowedPermissions: (
    newAllowedPermissions: PrivacyPermission[] | ((cur: PrivacyPermission[]) => PrivacyPermission[]),
  ) => void
}

export function createPrivacyPermissionScreenStore() {
  return createStore<PrivacyPermissionScreenState>()((set) => ({
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
