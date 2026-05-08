import { Trans } from '@lingui/react/macro'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function PhoneNumberHeader() {
  return (
    <VStack space="xs">
      <Heading>
        <Trans>Phone Number</Trans>
      </Heading>
      <Text>
        <Trans>We will send you a verification code.</Trans>
      </Text>
    </VStack>
  )
}
