import { useContactSyncScreenContext } from '@/contexts/contactSyncScreen'
import { cn } from '@/lib/utils'
import { RefreshCw, UserRoundCheck, UserRoundSearch } from 'lucide-react-native'
import { useStore } from 'zustand'
import { Box } from '../ui/box'
import { Icon } from '../ui/icon'

export function ContactSyncHeader() {
  const { stateStore } = useContactSyncScreenContext()

  const isSyncing = useStore(stateStore, (state) => state.isSyncing)
  const isSyncComplete = useStore(stateStore, (state) => state.isSyncComplete)

  let DisplayIcon = UserRoundSearch

  if (isSyncing) {
    DisplayIcon = RefreshCw
  }

  if (isSyncComplete) {
    DisplayIcon = UserRoundCheck
  }

  return (
    <Box className="items-center justify-center pt-20">
      <Box className="rounded-full bg-primary-100 p-4">
        <Icon as={DisplayIcon} className={cn({ 'animate-spin': isSyncing })} size={54} />
      </Box>
    </Box>
  )
}
