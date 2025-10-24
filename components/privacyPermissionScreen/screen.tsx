import { PrivacyPermissionFooter } from '@/components/privacyPermissionScreen/privacyPermissionFooter'
import { PrivacyPermissionHeader } from '@/components/privacyPermissionScreen/privacyPermissionHeader'
import { PrivacyPermissionListing } from '@/components/privacyPermissionScreen/privacyPermissionList'
import { VStack } from '@/components/ui/vstack'
import { PrivacyPermissionProvider } from '@/contexts/privacyPermissionScreen'
import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PrivacyPermissionScreen() {
  return (
    <>
      <Stack.Screen options={{ headerTransparent: true, title: '' }} />
      <PrivacyPermissionProvider>
        <SafeAreaView className="flex-1" edges={['bottom']}>
          <VStack className="flex-1">
            <ScrollView className="flex-1">
              <VStack className="p-4">
                <PrivacyPermissionHeader />
                <PrivacyPermissionListing />
              </VStack>
            </ScrollView>
            <PrivacyPermissionFooter />
          </VStack>
        </SafeAreaView>
      </PrivacyPermissionProvider>
    </>
  )
}
