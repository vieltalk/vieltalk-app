import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function PhoneNumberHeader() {
  return (
    <VStack space="xs">
      <Heading>Phone Number</Heading>
      <Text>We will send you a verification code.</Text>
    </VStack>
  )
}
