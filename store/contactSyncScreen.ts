import { createStore } from 'zustand'

export interface ContactSyncScreenState {
  isSyncing: boolean
  setIsSyncing: (isSyncing: boolean | ((prev: boolean) => boolean)) => void
  isSyncComplete: boolean
  setIsSyncComplete: (isSyncComplete: boolean | ((prev: boolean) => boolean)) => void
  syncPercentage: number
  setSyncPercentage: (syncPercentage: number | ((prev: number) => number)) => void
  friendsCount: number
  setFriendsCount: (friendsCount: number | ((prev: number) => number)) => void
  syncTitle: string
  setSyncTitle: (syncTitle: string) => void
  syncDescription: string
  setSyncDescription: (syncDescription: string) => void
}

export function createContactSyncScreenStore() {
  return createStore<ContactSyncScreenState>()((set) => ({
    isSyncing: false,
    setIsSyncing: (isSyncing: boolean | ((prev: boolean) => boolean)) =>
      set((state) => ({ isSyncing: typeof isSyncing === 'function' ? isSyncing(state.isSyncing) : isSyncing })),
    isSyncComplete: false,
    setIsSyncComplete: (isSyncComplete: boolean | ((prev: boolean) => boolean)) =>
      set((state) => ({
        isSyncComplete: typeof isSyncComplete === 'function' ? isSyncComplete(state.isSyncComplete) : isSyncComplete,
      })),
    syncPercentage: 0,
    setSyncPercentage: (syncPercentage: number | ((prev: number) => number)) =>
      set((state) => ({
        syncPercentage: typeof syncPercentage === 'function' ? syncPercentage(state.syncPercentage) : syncPercentage,
      })),
    friendsCount: 0,
    setFriendsCount: (friendsCount: number | ((prev: number) => number)) =>
      set((state) => ({
        friendsCount: typeof friendsCount === 'function' ? friendsCount(state.friendsCount) : friendsCount,
      })),
    syncTitle: 'Let’s make things easier',
    setSyncTitle: (syncTitle: string) => set({ syncTitle }),
    syncDescription: 'sync your contacts so we can connect you with people you know.',
    setSyncDescription: (syncDescription: string) => set({ syncDescription }),
  }))
}
