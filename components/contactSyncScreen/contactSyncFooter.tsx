import { useContactSyncScreenContext } from '@/contexts/contactSyncScreen'
import { Trans } from '@lingui/react/macro'
import { useStore } from 'zustand'
import { Box } from '../ui/box'
import { Button, ButtonText } from '../ui/button'
import { Card } from '../ui/card'
import { HStack } from '../ui/hstack'
import { Text } from '../ui/text'

export function ContactSyncFooter() {
  const { stateStore, goToChatList } = useContactSyncScreenContext()

  const isSyncing = useStore(stateStore, (state) => state.isSyncing)
  const isSyncComplete = useStore(stateStore, (state) => state.isSyncComplete)

  if (isSyncing) {
    return (
      <Box className="p-4">
        <Card size="md" variant="filled">
          <HStack>
            <Text>
              <Text className="font-bold">Privacy protected</Text>: Your contacts are encrypted and only used for friend
              discovery. We never store or share your contact information.
            </Text>
          </HStack>
        </Card>
      </Box>
    )
  }

  if (isSyncComplete) {
    return (
      <Box className="p-4">
        <Button size="xl" onPress={goToChatList}>
          <ButtonText>
            <Trans>Start Chatting</Trans>
          </ButtonText>
        </Button>
      </Box>
    )
  }

  return (
    <HStack className="items-center justify-between p-4">
      <Button size="xl" action="secondary" onPress={goToChatList}>
        <ButtonText>
          <Trans>Not Now</Trans>
        </ButtonText>
      </Button>
      <Button size="xl">
        <ButtonText>
          <Trans>Sync</Trans>
        </ButtonText>
      </Button>
    </HStack>
  )
}
