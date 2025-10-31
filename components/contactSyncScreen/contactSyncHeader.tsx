import { useContactSyncScreenContext } from '@/contexts/contactSyncScreen'
import { useThemeColor } from '@/hooks/use-theme-color'
import { RefreshCw, UserRoundCheck, UserRoundSearch } from 'lucide-react-native'
import { useStore } from 'zustand'
import { CircularProgress } from '../circularProgress'
import { Box } from '../ui/box'
import { Icon } from '../ui/icon'

export function ContactSyncHeader() {
  const { stateStore } = useContactSyncScreenContext()
  const backgroundColor = useThemeColor({}, 'outline')
  const progressColor = useThemeColor({}, 'primary')

  const isSyncing = useStore(stateStore, (state) => state.isSyncing)
  const isSyncComplete = useStore(stateStore, (state) => state.isSyncComplete)
  const syncPercentage = useStore(stateStore, (state) => state.syncPercentage)

  return (
    <Box className="relative mt-16 h-28 items-center justify-center">
      <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <CircularProgress
          size={90}
          backgroundColor={backgroundColor}
          progressColor={progressColor}
          strokeWidth={4}
          value={syncPercentage}
        />
      </Box>
      <Box className="absolute left-1/2 top-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-100">
        {!isSyncing && !isSyncComplete && (
          <Box className="pl-1.5">
            <Icon as={UserRoundSearch} size={32} />
          </Box>
        )}
        {isSyncing && !isSyncComplete && <Icon as={RefreshCw} className="animate-spin" size={32} />}
        {isSyncComplete && (
          <Box className="pl-1.5">
            <Icon as={UserRoundCheck} size={32} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
