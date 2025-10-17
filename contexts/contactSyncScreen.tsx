import { ContactSyncScreenState, createContactSyncScreenStore } from '@/store/contactSyncScreen'
import { createContext, use, useRef } from 'react'
import { StoreApi } from 'zustand'

interface ContactSyncScreenContextValue {
  stateStore: StoreApi<ContactSyncScreenState>
}

const ContactSyncScreenContext = createContext<ContactSyncScreenContextValue | undefined>(undefined)

export function ContactSyncScreenProvider({ children }: { children?: React.ReactNode }) {
  const store = useRef<StoreApi<ContactSyncScreenState>>(undefined)

  if (!store.current) {
    store.current = createContactSyncScreenStore()
  }

  return <ContactSyncScreenContext value={{ stateStore: store.current }}>{children}</ContactSyncScreenContext>
}

export function useContactSyncScreenContext() {
  const context = use(ContactSyncScreenContext)

  if (!context) {
    throw new Error('useContactSyncScreenContext must be used within a ContactSyncScreenProvider')
  }

  return context
}
