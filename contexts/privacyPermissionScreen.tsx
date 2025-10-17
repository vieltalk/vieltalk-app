import { getPrivacyPermission } from '@/api/privacyPermission'
import { PrivacyPermission, PrivacyPermissionItem } from '@/api/shared.types'
import { ReactQueryKeys } from '@/lib/constants'
import { ROUTE } from '@/lib/routes'
import { registerForPushNotificationsAsync } from '@/lib/utils'
import { PrivacyPermissionScreenState, createPrivacyPermissionScreenStore } from '@/store/privacyPermissionScreen'
import { useLingui } from '@lingui/react/macro'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import * as Audio from 'expo-audio'
import * as Contacts from 'expo-contacts'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import { createContext, use, useRef } from 'react'
import { StoreApi, useStore } from 'zustand'

interface PrivacyPermissionContextValue {
  privacyQuery: UseQueryResult<PrivacyPermissionItem[], Error>
  stateStore: StoreApi<PrivacyPermissionScreenState>
  handleAllowPress: () => void
  goNextScreen: () => void
}

const PrivacyPermissionContext = createContext<PrivacyPermissionContextValue | undefined>(undefined)

export function PrivacyPermissionProvider({ children }: { children?: React.ReactNode }) {
  const { i18n } = useLingui()
  const router = useRouter()

  const store = useRef<StoreApi<PrivacyPermissionScreenState>>(undefined)

  if (!store.current) {
    store.current = createPrivacyPermissionScreenStore()
  }

  const allowedPermissions = useStore(store.current, (state) => state.allowedPermissions)

  const privacyQuery = useQuery({
    queryKey: [ReactQueryKeys.PRIVACY_PERMISSION, i18n.locale],
    queryFn: getPrivacyPermission,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  })

  const goNextScreen = () => {
    router.push(ROUTE.INPUT_PHONE)
  }

  const handleAllowPress = async () => {
    if (allowedPermissions.includes(PrivacyPermission.CONTACTS)) {
      const { status } = await Contacts.getPermissionsAsync()
      if (status !== 'granted') {
        await Contacts.requestPermissionsAsync()
      }
    }

    if (allowedPermissions.includes(PrivacyPermission.NOTIFICATIONS)) {
      await registerForPushNotificationsAsync()
    }

    if (allowedPermissions.includes(PrivacyPermission.LOCATION)) {
      const { status } = await Location.getForegroundPermissionsAsync()
      if (status !== 'granted') {
        await Location.requestForegroundPermissionsAsync()
      }
    }

    if (allowedPermissions.includes(PrivacyPermission.CAMERA)) {
      const { status } = await ImagePicker.getCameraPermissionsAsync()
      if (status !== 'granted') {
        await ImagePicker.requestCameraPermissionsAsync()
      }
      const { status: mediaLibraryStatus } = await ImagePicker.getMediaLibraryPermissionsAsync()
      if (mediaLibraryStatus !== 'granted') {
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      }
      const { status: audioStatus } = await Audio.getRecordingPermissionsAsync()
      if (audioStatus !== 'granted') {
        await Audio.requestRecordingPermissionsAsync()
      }
    }

    goNextScreen()
  }

  return (
    <PrivacyPermissionContext value={{ privacyQuery, stateStore: store.current, handleAllowPress, goNextScreen }}>
      {children}
    </PrivacyPermissionContext>
  )
}

export function usePrivacyPermissionContext() {
  const context = use(PrivacyPermissionContext)

  if (!context) {
    throw new Error('usePrivacyPermissionContext must be used within a PrivacyPermissionProvider')
  }

  return context
}
