import { VStack } from '@/components/ui/vstack'
import { HomeScreenProvider } from '@/contexts/homeScreen'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeActions } from './homeActions'
import { HomeHeader } from './homeHeader'

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HomeScreenProvider>
        <SafeAreaView className="flex-1">
          <VStack>
            <HomeHeader />
            <HomeActions />
          </VStack>
        </SafeAreaView>
      </HomeScreenProvider>
    </>
  )
}
