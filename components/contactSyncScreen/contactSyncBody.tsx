import { useContactSyncScreenContext } from '@/contexts/contactSyncScreen'
import { useStore } from 'zustand'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function ContactSyncBody() {
  const { stateStore } = useContactSyncScreenContext()

  const syncPercentage = useStore(stateStore, (state) => state.syncPercentage)
  const syncTitle = useStore(stateStore, (state) => state.syncTitle)
  const syncDescription = useStore(stateStore, (state) => state.syncDescription)

  return (
    <VStack className="items-center">
      <Text size="sm" className="text-primary-400">
        {syncPercentage}%
      </Text>
      <Heading>{syncTitle}</Heading>
      <Text>{syncDescription}</Text>
    </VStack>
  )
}
