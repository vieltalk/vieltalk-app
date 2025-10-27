import { ROUTE } from '@/lib/routes'
import { ContactSyncScreenState, createContactSyncScreenStore } from '@/store/contactSyncScreen'
import { useGlobalStore } from '@/store/global/store'
import { useNavigation } from 'expo-router'
import { createContext, use, useRef } from 'react'
import { StoreApi } from 'zustand'

interface ContactSyncScreenContextValue {
  stateStore: StoreApi<ContactSyncScreenState>
  goToChatList: () => void
}

const ContactSyncScreenContext = createContext<ContactSyncScreenContextValue | undefined>(undefined)

export function ContactSyncScreenProvider({ children }: { children?: React.ReactNode }) {
  const navigation = useNavigation()
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn)

  const store = useRef<StoreApi<ContactSyncScreenState>>(undefined)

  if (!store.current) {
    store.current = createContactSyncScreenStore()
  }

  const goToChatList = () => {
    setIsLoggedIn(true)
    navigation.reset({ index: 0, routes: [{ name: ROUTE.HOME as never }] })
  }

  return (
    <ContactSyncScreenContext value={{ stateStore: store.current, goToChatList }}>{children}</ContactSyncScreenContext>
  )
}

export function useContactSyncScreenContext() {
  const context = use(ContactSyncScreenContext)

  if (!context) {
    throw new Error('useContactSyncScreenContext must be used within a ContactSyncScreenProvider')
  }

  return context
}
