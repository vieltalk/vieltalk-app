import { useVerifyOtpContext } from '@/contexts/verifyOtp'
import { formatPhoneNumber } from '@/lib/utils'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function VerifyOtpHeader() {
  const { phone } = useVerifyOtpContext()

  return (
    <VStack space="xs">
      <Heading>Verification Code</Heading>
      <Text>Enter the code we sent to +{formatPhoneNumber(phone)}</Text>
    </VStack>
  )
}
