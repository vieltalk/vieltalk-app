import { Button, ButtonText } from '../ui/button'
import { HStack } from '../ui/hstack'

export function VerifyOtpFooter() {
  return (
    <HStack className="items-center justify-between p-4" space="lg">
      <Button size="xl" action="secondary">
        <ButtonText>Wrong Number</ButtonText>
      </Button>
      <Button size="xl">
        <ButtonText>Next</ButtonText>
      </Button>
    </HStack>
  )
}
