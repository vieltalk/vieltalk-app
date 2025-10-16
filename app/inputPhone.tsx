import { PhoneNumberForm } from '@/components/inputPhoneScreen/phoneNumberForm'
import { PhoneNumberHeader } from '@/components/inputPhoneScreen/phoneNumberHeader'
import { PhoneNumberNextBtn } from '@/components/inputPhoneScreen/phoneNumberNextBtn'
import { VStack } from '@/components/ui/vstack'
import { InputPhoneScreenProvider } from '@/contexts/inputPhoneScreen'
import { Stack } from 'expo-router'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function InputPhoneScreen() {
  return (
    <>
      <Stack.Screen options={{ headerTransparent: true, title: '' }} />
      <InputPhoneScreenProvider>
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <VStack className="flex-1">
              <ScrollView className="flex-1 pt-12">
                <VStack className="flex-1 p-4" space="2xl">
                  <PhoneNumberHeader />
                  <PhoneNumberForm />
                </VStack>
              </ScrollView>
              <PhoneNumberNextBtn />
            </VStack>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </InputPhoneScreenProvider>
    </>
  )
}
