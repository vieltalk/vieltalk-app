import { LogoutBtn } from '@/components/homeScreen/logoutBtn'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { HomeScreenProvider } from '@/contexts/homeScreen'
import { Trans } from '@lingui/react/macro'

export default function HomeScreen() {
  return (
    <HomeScreenProvider>
      <VStack className="p-4">
        <Text className="text-2xl font-bold text-blue-400">
          <Trans>Home Screen of Vieltalk Chat</Trans>
        </Text>
        <LogoutBtn />
      </VStack>
    </HomeScreenProvider>
  )
}
