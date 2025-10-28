import { useContactSyncScreenContext } from '@/contexts/contactSyncScreen'
import { useStore } from 'zustand'
import { Avatar, AvatarFallbackText } from '../ui/avatar'
import { Badge, BadgeText } from '../ui/badge'
import { Box } from '../ui/box'
import { Card } from '../ui/card'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function ContactSyncBody() {
  const { stateStore } = useContactSyncScreenContext()

  const syncPercentage = useStore(stateStore, (state) => state.syncPercentage)
  const isSyncComplete = useStore(stateStore, (state) => state.isSyncComplete)
  const isSyncing = useStore(stateStore, (state) => state.isSyncing)
  const syncTitle = useStore(stateStore, (state) => state.syncTitle)
  const syncDescription = useStore(stateStore, (state) => state.syncDescription)
  const friendsCount = useStore(stateStore, (state) => state.friendsCount)

  return (
    <VStack className="items-center">
      {isSyncing && (
        <Text size="sm" className="text-primary-400">
          {Math.min(syncPercentage, 100)}%
        </Text>
      )}
      <VStack space="md" className="items-center">
        <Heading className="text-center">{syncTitle}</Heading>
        <Text className="text-center">{syncDescription}</Text>
        {!!friendsCount && !isSyncComplete && (
          <Badge size="lg" variant="outline" action="success">
            <BadgeText>{friendsCount} friends found</BadgeText>
          </Badge>
        )}
        {isSyncComplete && (
          <Card size="md" variant="filled" className="border border-outline-200">
            <Box className="flex-row flex-wrap">
              {Array.from({ length: Math.min(friendsCount, 8) }, (_, index) => (
                <Box key={index} className="w-[25%] items-center justify-center py-2">
                  <Avatar size="md">
                    <AvatarFallbackText>A</AvatarFallbackText>
                  </Avatar>
                </Box>
              ))}
            </Box>
            {friendsCount > 8 && (
              <Text className="mt-2 text-center" size="xs">
                +{friendsCount - 8} more friends found
              </Text>
            )}
          </Card>
        )}
      </VStack>
    </VStack>
  )
}
