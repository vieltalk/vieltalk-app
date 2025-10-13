import { getPrivacyPermission } from '@/api/privacyPermission'
import { PrivacyPermissionItem } from '@/api/shared.types'
import { ReactQueryKeys } from '@/lib/constants'
import { useLingui } from '@lingui/react/macro'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { createContext, use } from 'react'

interface PrivacyPermissionContextValue {
  privacyQuery: UseQueryResult<PrivacyPermissionItem[], Error>
}

const PrivacyPermissionContext = createContext<PrivacyPermissionContextValue | undefined>(undefined)

export function PrivacyPermissionProvider({ children }: { children?: React.ReactNode }) {
  const { i18n } = useLingui()

  const privacyQuery = useQuery({
    queryKey: [ReactQueryKeys.PRIVACY_PERMISSION, i18n.locale],
    queryFn: getPrivacyPermission,
  })

  return <PrivacyPermissionContext value={{ privacyQuery }}>{children}</PrivacyPermissionContext>
}

export function usePrivacyPermissionContext() {
  const context = use(PrivacyPermissionContext)

  if (!context) {
    throw new Error('usePrivacyPermissionContext must be used within a PrivacyPermissionProvider')
  }

  return context
}
