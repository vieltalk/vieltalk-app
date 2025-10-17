import { createStore } from 'zustand'

export interface ContactSyncScreenState {
  isSyncing: boolean
  setIsSyncing: (isSyncing: boolean) => void
  isSyncComplete: boolean
  setIsSyncComplete: (isSyncComplete: boolean) => void
  syncPercentage: number
  setSyncPercentage: (syncPercentage: number) => void
  friendsCount: number
  setFriendsCount: (friendsCount: number) => void
  syncTitle: string
  setSyncTitle: (syncTitle: string) => void
  syncDescription: string
  setSyncDescription: (syncDescription: string) => void
}

export function createContactSyncScreenStore() {
  return createStore<ContactSyncScreenState>()((set) => ({
    isSyncing: false,
    setIsSyncing: (isSyncing: boolean) => set({ isSyncing }),
    isSyncComplete: false,
    setIsSyncComplete: (isSyncComplete: boolean) => set({ isSyncComplete }),
    syncPercentage: 0,
    setSyncPercentage: (syncPercentage: number) => set({ syncPercentage }),
    friendsCount: 0,
    setFriendsCount: (friendsCount: number) => set({ friendsCount }),
    syncTitle: '',
    setSyncTitle: (syncTitle: string) => set({ syncTitle }),
    syncDescription: '',
    setSyncDescription: (syncDescription: string) => set({ syncDescription }),
  }))
}
