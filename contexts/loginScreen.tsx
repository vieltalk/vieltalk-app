import { getContactsAsync, registerForPushNotificationsAsync } from '@/lib/utils'
import { LoginScreenStore, createLoginScreenStore } from '@/store/loginScreen'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { createContext, use, useRef } from 'react'

interface LoginScreenContextValue {
  stateStore: LoginScreenStore
  onGetStartedPress: () => void
  onAllowPermissionsPress: () => void
  onSkipForNowPress: () => void
  privacyBottomSheetRef: React.RefObject<BottomSheetModal | null>
}

const LoginScreenContext = createContext<LoginScreenContextValue | undefined>(undefined)

export function LoginScreenProvider({ children }: { children?: React.ReactNode }) {
  const store = useRef(createLoginScreenStore()).current
  const privacyBottomSheetRef = useRef<BottomSheetModal>(null)

  const onGetStartedPress = () => {
    privacyBottomSheetRef.current?.present()
  }

  const onAllowPermissionsPress = async () => {
    const token = await registerForPushNotificationsAsync()
    console.log(token)
    const contacts = await getContactsAsync()
    console.log(contacts)
  }

  const onSkipForNowPress = () => {}

  return (
    <LoginScreenContext
      value={{
        stateStore: store,
        onGetStartedPress,
        onAllowPermissionsPress,
        onSkipForNowPress,
        privacyBottomSheetRef,
      }}
    >
      {children}
    </LoginScreenContext>
  )
}

export function useLoginScreenContext() {
  const context = use(LoginScreenContext)

  if (!context) {
    throw new Error('useLoginScreenContext must be used within a LoginScreenProvider')
  }

  return context
}
