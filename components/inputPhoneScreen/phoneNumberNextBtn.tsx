import { useInputPhoneScreenContext } from '@/contexts/inputPhoneScreen'
import { Trans } from '@lingui/react/macro'
import { Box } from '../ui/box'
import { Button, ButtonSpinner, ButtonText } from '../ui/button'

export function PhoneNumberNextBtn() {
  const { handleNextPress, isLoading } = useInputPhoneScreenContext()

  return (
    <Box className="p-4">
      <Button size="xl" onPress={handleNextPress} disabled={isLoading}>
        {isLoading && <ButtonSpinner color="gray" />}
        <ButtonText>
          <Trans>Next</Trans>
        </ButtonText>
      </Button>
    </Box>
  )
}
