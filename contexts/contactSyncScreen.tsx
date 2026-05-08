import { ContactSyncRequest } from '@/api/shared.types'
import { contactSync } from '@/api/user'
import { SocketEvents } from '@/lib/constants'
import { hashString } from '@/lib/encryption'
import { getContacts } from '@/lib/permissions'
import { ROUTE } from '@/lib/routes'
import { ContactSyncScreenState, createContactSyncScreenStore } from '@/store/contactSyncScreen'
import { useGlobalStore } from '@/store/global/store'
import { useMutation } from '@tanstack/react-query'
import { useNavigation, useRouter } from 'expo-router'
import { createContext, use, useEffect, useRef, useState } from 'react'
import { getUniqueIdSync } from 'react-native-device-info'
import { StoreApi, useStore } from 'zustand'
import { useSocketIoContext } from './socketIo'

interface ContactSyncScreenContextValue {
  stateStore: StoreApi<ContactSyncScreenState>
  goToChatList: () => void
  handleSync: () => void
}

const ContactSyncScreenContext = createContext<ContactSyncScreenContextValue | undefined>(undefined)

export function ContactSyncScreenProvider({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const navigation = useNavigation()
  const { socket } = useSocketIoContext()
  const userId = useGlobalStore((state) => state.userInfo?.id)

  const [store] = useState(() => createContactSyncScreenStore())

  const contactTotalCount = useRef(0)
  const syncedContactCount = useRef(0)

  const friendsCount = useStore(store, (state) => state.friendsCount)
  const isSyncComplete = useStore(store, (state) => state.isSyncComplete)

  const setIsSyncing = useStore(store, (state) => state.setIsSyncing)
  const setIsSyncComplete = useStore(store, (state) => state.setIsSyncComplete)
  const setSyncPercentage = useStore(store, (state) => state.setSyncPercentage)
  const setFriendsCount = useStore(store, (state) => state.setFriendsCount)
  const setSyncTitle = useStore(store, (state) => state.setSyncTitle)
  const setSyncDescription = useStore(store, (state) => state.setSyncDescription)

  const contactSyncMutation = useMutation({
    mutationFn: contactSync,
  })

  const goToChatList = () => {
    router.replace(ROUTE.HOME)
  }

  const handleSync = async () => {
    setIsSyncing(true)
    setSyncTitle('Finding your friends...')
    setSyncDescription('Matching your contacts with existing users.')

    navigation.setOptions({ gestureEnabled: false, headerShown: false })

    const contacts = await getContacts()

    const formattedContacts = contacts.flatMap(
      (contact) =>
        contact.phoneNumbers?.map((phoneNumber) => ({
          name: contact.name,
          phoneNumber: hashString(phoneNumber.number || ''),
        })) || [],
    )

    contactTotalCount.current = formattedContacts.length

    const contactSyncRequest: ContactSyncRequest = {
      ownerUserId: userId || '',
      deviceId: getUniqueIdSync(),
      contacts: formattedContacts,
    }

    contactSyncMutation.mutate(contactSyncRequest)
  }

  const updateSyncPercentage = () => {
    syncedContactCount.current += 1

    const percentage = (syncedContactCount.current / contactTotalCount.current) * 100
    setSyncPercentage(percentage)

    if (percentage >= 100) {
      setIsSyncing(false)
      setIsSyncComplete(true)
      setSyncTitle('Contact Synced!')
      setSyncDescription(`We found ${friendsCount} friends who are already using Vieltalk.`)
    }
  }

  useEffect(() => {
    socket.on(SocketEvents.CONTACT_SYNCED, () => {
      updateSyncPercentage()
      setFriendsCount((prev) => prev + 1)
    })
    socket.on(SocketEvents.CONTACT_UNSYNCED, () => {
      updateSyncPercentage()
    })

    return () => {
      socket.off(SocketEvents.CONTACT_SYNCED)
      socket.off(SocketEvents.CONTACT_UNSYNCED)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  useEffect(() => {
    if (isSyncComplete) {
      socket.off(SocketEvents.CONTACT_SYNCED)
      socket.off(SocketEvents.CONTACT_UNSYNCED)
    }
  }, [isSyncComplete, socket])

  return (
    <ContactSyncScreenContext value={{ stateStore: store, goToChatList, handleSync }}>
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
