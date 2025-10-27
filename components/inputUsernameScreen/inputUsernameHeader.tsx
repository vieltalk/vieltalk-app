import { Trans } from '@lingui/react/macro'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function InputUsernameHeader() {
  return (
    <VStack space="xs">
      <Heading>
        <Trans>Your Profile</Trans>
      </Heading>
      <Text>
        <Trans>Profiles are visible to your contacts, chats and groups.</Trans>
      </Text>
    </VStack>
  )
}
