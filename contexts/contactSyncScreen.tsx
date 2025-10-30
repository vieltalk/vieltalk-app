import { ROUTE } from '@/lib/routes'
import { randomNumBetween } from '@/lib/utils'
import { ContactSyncScreenState, createContactSyncScreenStore } from '@/store/contactSyncScreen'
import { useRouter } from 'expo-router'
import { createContext, use, useEffect, useRef } from 'react'
import { StoreApi, useStore } from 'zustand'

interface ContactSyncScreenContextValue {
  stateStore: StoreApi<ContactSyncScreenState>
  goToChatList: () => void
  handleSync: () => void
}

const ContactSyncScreenContext = createContext<ContactSyncScreenContextValue | undefined>(undefined)

export function ContactSyncScreenProvider({ children }: { children?: React.ReactNode }) {
  const router = useRouter()

  const store = useRef<StoreApi<ContactSyncScreenState>>(undefined)
  const mockSyncInterval = useRef<number | undefined>(undefined)

  if (!store.current) {
    store.current = createContactSyncScreenStore()
  }

  const setIsSyncing = useStore(store.current, (state) => state.setIsSyncing)
  const setIsSyncComplete = useStore(store.current, (state) => state.setIsSyncComplete)
  const syncPercentage = useStore(store.current, (state) => state.syncPercentage)
  const setSyncPercentage = useStore(store.current, (state) => state.setSyncPercentage)
  const friendsCount = useStore(store.current, (state) => state.friendsCount)
  const setFriendsCount = useStore(store.current, (state) => state.setFriendsCount)
  const setSyncTitle = useStore(store.current, (state) => state.setSyncTitle)
  const setSyncDescription = useStore(store.current, (state) => state.setSyncDescription)

  const goToChatList = () => {
    router.replace(ROUTE.HOME)
  }

  const handleSync = () => {
    mockSync()
  }

  // TODO: to be removed
  const mockSync = () => {
    setIsSyncing(true)
    setSyncTitle('Finding your friends...')
    setSyncDescription('Matching your contacts with existing users.')

    mockSyncInterval.current = setInterval(() => {
      setSyncPercentage((prev) => prev + randomNumBetween(0, 15))
      setFriendsCount((prev) => prev + randomNumBetween(0, 5))
    }, 1000)
  }

  // TODO: to be removed
  useEffect(() => {
    if (syncPercentage >= 100) {
      clearInterval(mockSyncInterval.current)
      setIsSyncing(false)
      setIsSyncComplete(true)
      setSyncTitle('Contact Syncd!')
      setSyncDescription(`We found ${friendsCount} friends who are already using Vieltalk.`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncPercentage])

  // TODO: to be removed
  useEffect(() => {
    return () => {
      clearInterval(mockSyncInterval.current)
    }
  }, [])

  return (
    <ContactSyncScreenContext value={{ stateStore: store.current, goToChatList, handleSync }}>
      {children}
    </ContactSyncScreenContext>
  )
}

export function useContactSyncScreenContext() {
  const context = use(ContactSyncScreenContext)

  if (!context) {
    throw new Error('useContactSyncScreenContext must be used within a ContactSyncScreenProvider')
  }

  return context
}
