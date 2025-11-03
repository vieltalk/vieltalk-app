import { ContactSyncRequest } from '@/api/shared.types'
import { contactSync } from '@/api/user'
import { hashString } from '@/lib/encryption'
import { getContacts } from '@/lib/permissions'
import { ROUTE } from '@/lib/routes'
import { ContactSyncScreenState, createContactSyncScreenStore } from '@/store/contactSyncScreen'
import { useGlobalStore } from '@/store/global/store'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { createContext, use, useRef } from 'react'
import { getUniqueIdSync } from 'react-native-device-info'
import { StoreApi } from 'zustand'

interface ContactSyncScreenContextValue {
  stateStore: StoreApi<ContactSyncScreenState>
  goToChatList: () => void
  handleSync: () => void
}

const ContactSyncScreenContext = createContext<ContactSyncScreenContextValue | undefined>(undefined)

export function ContactSyncScreenProvider({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const userId = useGlobalStore((state) => state.userInfo?.id)

  const store = useRef<StoreApi<ContactSyncScreenState>>(undefined)
  // const mockSyncInterval = useRef<number | undefined>(undefined)

  if (!store.current) {
    store.current = createContactSyncScreenStore()
  }

  // const setIsSyncing = useStore(store.current, (state) => state.setIsSyncing)
  // const setIsSyncComplete = useStore(store.current, (state) => state.setIsSyncComplete)
  // const syncPercentage = useStore(store.current, (state) => state.syncPercentage)
  // const setSyncPercentage = useStore(store.current, (state) => state.setSyncPercentage)
  // const friendsCount = useStore(store.current, (state) => state.friendsCount)
  // const setFriendsCount = useStore(store.current, (state) => state.setFriendsCount)
  // const setSyncTitle = useStore(store.current, (state) => state.setSyncTitle)
  // const setSyncDescription = useStore(store.current, (state) => state.setSyncDescription)

  const contactSyncMutation = useMutation({
    mutationFn: contactSync,
  })

  const goToChatList = () => {
    router.replace(ROUTE.HOME)
  }

  const handleSync = async () => {
    const contacts = await getContacts()

    const contactSyncRequest: ContactSyncRequest = {
      ownerUserId: userId || '',
      deviceId: getUniqueIdSync(),
      contacts: contacts.flatMap(
        (contact) =>
          contact.phoneNumbers?.map((phoneNumber) => ({
            name: contact.name,
            phoneNumber: hashString(phoneNumber.number || ''),
          })) || [],
      ),
    }

    contactSyncMutation.mutate(contactSyncRequest)

    // mockSync()
  }

  // TODO: to be removed
  // const mockSync = () => {
  //   setIsSyncing(true)
  //   setSyncTitle('Finding your friends...')
  //   setSyncDescription('Matching your contacts with existing users.')

  //   mockSyncInterval.current = setInterval(() => {
  //     setSyncPercentage((prev) => prev + randomNumBetween(0, 15))
  //     setFriendsCount((prev) => prev + randomNumBetween(0, 5))
  //   }, 1000)
  // }

  // // TODO: to be removed
  // useEffect(() => {
  //   if (syncPercentage >= 100) {
  //     clearInterval(mockSyncInterval.current)
  //     setIsSyncing(false)
  //     setIsSyncComplete(true)
  //     setSyncTitle('Contact Syncd!')
  //     setSyncDescription(`We found ${friendsCount} friends who are already using Vieltalk.`)
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [syncPercentage])

  // // TODO: to be removed
  // useEffect(() => {
  //   return () => {
  //     clearInterval(mockSyncInterval.current)
  //   }
  // }, [])

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
