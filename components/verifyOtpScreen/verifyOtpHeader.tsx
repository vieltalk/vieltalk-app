import { useVerifyOtpContext } from '@/contexts/verifyOtp'
import { formatPhoneNumber } from '@/lib/utils'
import { Trans } from '@lingui/react/macro'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function VerifyOtpHeader() {
  const { phone } = useVerifyOtpContext()

  const phoneNumber = formatPhoneNumber(phone)

  return (
    <VStack space="xs">
      <Heading>
        <Trans>Verification Code</Trans>
      </Heading>
      <Text>
        <Trans>Enter the code we sent to +{phoneNumber}</Trans>
      </Text>
    </VStack>
  )
}
