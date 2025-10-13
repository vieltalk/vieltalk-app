import { PrivacyPermissionHeader } from '@/components/privacyPermissionScreen/privacyPermissionHeader'
import { PrivacyPermissionListing } from '@/components/privacyPermissionScreen/privacyPermissionList'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { VStack } from '@/components/ui/vstack'
import { PrivacyPermissionProvider } from '@/contexts/privacyPermission'
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
            <Box className="p-4">
              <Button size="xl">
                <ButtonText>Allow Permissions</ButtonText>
              </Button>
            </Box>
          </VStack>
        </SafeAreaView>
      </PrivacyPermissionProvider>
    </>
  )
}
