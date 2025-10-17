import { useVerifyOtpContext } from '@/contexts/verifyOtp'
import { Trans } from '@lingui/react/macro'
import { useRouter } from 'expo-router'
import { Button, ButtonText } from '../ui/button'
import { HStack } from '../ui/hstack'

export function VerifyOtpFooter() {
  const router = useRouter()
  const { onFilledOtp } = useVerifyOtpContext()

  return (
    <HStack className="items-center justify-between p-4" space="lg">
      <Button size="xl" action="secondary" onPress={router.back}>
        <ButtonText>
          <Trans>Wrong Number</Trans>
        </ButtonText>
      </Button>
      <Button size="xl" onPress={onFilledOtp}>
        <ButtonText>
          <Trans>Next</Trans>
        </ButtonText>
      </Button>
    </HStack>
  )
}
