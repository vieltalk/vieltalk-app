import { ContactSyncBody } from '@/components/contactSyncScreen/contactSyncBody'
import { ContactSyncFooter } from '@/components/contactSyncScreen/contactSyncFooter'
import { ContactSyncHeader } from '@/components/contactSyncScreen/contactSyncHeader'
import { VStack } from '@/components/ui/vstack'
import { ContactSyncScreenProvider } from '@/contexts/contactSyncScreen'
import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ContactSync() {
  return (
    <>
      <Stack.Screen options={{ headerTransparent: true, title: '' }} />
      <ContactSyncScreenProvider>
        <SafeAreaView className="flex-1">
          <VStack className="flex-1">
            <ScrollView className="flex-1">
              <VStack space="md">
                <ContactSyncHeader />
                <ContactSyncBody />
              </VStack>
            </ScrollView>
            <ContactSyncFooter />
          </VStack>
        </SafeAreaView>
      </ContactSyncScreenProvider>
    </>
  )
}
