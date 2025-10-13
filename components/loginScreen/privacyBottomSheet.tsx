import { useLoginScreenContext } from '@/contexts/loginScreen'
import { BottomSheetFooter, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { Bell, ExternalLink, Shield, Users } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Box } from '../ui/box'
import { Button, ButtonIcon, ButtonText } from '../ui/button'
import { Card } from '../ui/card'
import { Heading } from '../ui/heading'
import { HStack } from '../ui/hstack'
import { Icon } from '../ui/icon'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function PrivacyBottomSheet() {
  const { privacyBottomSheetRef } = useLoginScreenContext()
  const safeAreaInsets = useSafeAreaInsets()

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={privacyBottomSheetRef}
        enableDynamicSizing={false}
        snapPoints={['60%']}
        footerComponent={(props) => (
          <BottomSheetFooter {...props} bottomInset={safeAreaInsets.bottom}>
            <HStack className="p-4" space="sm">
              <Button
                action="secondary"
                className="flex-1"
                size="xl"
                onPress={() => privacyBottomSheetRef.current?.close()}
              >
                <ButtonText>Skip for now</ButtonText>
              </Button>
              <Button className="flex-1" size="xl" onPress={() => {}}>
                <ButtonText>Allow</ButtonText>
              </Button>
            </HStack>
          </BottomSheetFooter>
        )}
      >
        <BottomSheetView>
          <VStack className="px-4">
            <Card variant="outline">
              <HStack space="lg" className="items-start">
                <Box className="rounded-full bg-primary-100 p-4">
                  <Icon as={Shield} className="text-primary-400" size="xl" />
                </Box>
                <VStack className="flex-1 items-start">
                  <Heading size="sm">Terms & Privacy Policy</Heading>
                  <Text size="sm" className="flex-1">
                    You agree to our Terms of Service by installing or using our app.
                  </Text>
                  <Button variant="link" size="sm">
                    <ButtonText>Learn More</ButtonText>
                    <ButtonIcon as={ExternalLink} />
                  </Button>
                </VStack>
              </HStack>
            </Card>
            <Heading className="mt-4 text-center">Permissions</Heading>
            <Text size="sm" className="text-center">
              To help you message people know, Vieltalk will need these permissions.
            </Text>
            <VStack space="lg" className="mt-2">
              <Card variant="outline">
                <HStack space="lg" className="items-start">
                  <Box className="rounded-full bg-background-100 p-4">
                    <Icon as={Bell} size="xl" />
                  </Box>
                  <VStack className="flex-1 items-start">
                    <Heading size="sm">Notifications</Heading>
                    <Text size="sm">Get notified when you receive a message.</Text>
                  </VStack>
                </HStack>
              </Card>
              <Card variant="outline">
                <HStack space="lg" className="items-start">
                  <Box className="rounded-full bg-background-100 p-4">
                    <Icon as={Users} size="xl" />
                  </Box>
                  <VStack className="flex-1 items-start">
                    <Heading size="sm">Contacts</Heading>
                    <Text size="sm">Discover people you know who are also using Vieltalk.</Text>
                  </VStack>
                </HStack>
              </Card>
            </VStack>
          </VStack>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}
