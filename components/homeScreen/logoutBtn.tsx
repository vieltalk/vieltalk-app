import { Button, ButtonText } from '@/components/ui/button'
import { useHomeScreenContext } from '@/contexts/homeScreen'

export function LogoutBtn() {
  const { handleLogout } = useHomeScreenContext()

  return (
    <Button onPress={handleLogout}>
      <ButtonText>Logout</ButtonText>
    </Button>
  )
}
