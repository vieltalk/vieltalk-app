import { useInputPhoneScreenContext } from '@/contexts/inputPhoneScreen'
import { Box } from '../ui/box'
import { Button, ButtonText } from '../ui/button'

export function PhoneNumberNextBtn() {
  const { handleNextPress } = useInputPhoneScreenContext()

  return (
    <Box className="p-4">
      <Button size="xl" onPress={handleNextPress}>
        <ButtonText>Next</ButtonText>
      </Button>
    </Box>
  )
}
