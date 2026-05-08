import { useInputUsernameScreenContext } from '@/contexts/inputUsernameScreen'
import { Trans } from '@lingui/react/macro'
import { Box } from '../ui/box'
import { Button, ButtonText } from '../ui/button'

export function InputUsernameNextBtn() {
  const { handleNextPress } = useInputUsernameScreenContext()

  return (
    <Box className="p-4">
      <Button size="xl" onPress={handleNextPress}>
        <ButtonText>
          <Trans>Next</Trans>
        </ButtonText>
      </Button>
    </Box>
  )
}
