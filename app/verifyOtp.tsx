import { VStack } from '@/components/ui/vstack'
import { VerifyOtpFooter } from '@/components/verifyOtpScreen/verifyOtpFooter'
import { VerifyOtpForm } from '@/components/verifyOtpScreen/verifyOtpForm'
import { VerifyOtpHeader } from '@/components/verifyOtpScreen/verifyOtpHeader'
import { VerifyOtpProvider } from '@/contexts/verifyOtp'
import { Stack } from 'expo-router'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function VerifyOtpScreen() {
  return (
    <>
      <Stack.Screen options={{ headerTransparent: true, title: '' }} />
      <VerifyOtpProvider>
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <SafeAreaView className="flex-1">
            <VStack className="flex-1">
              <ScrollView className="flex-1 pt-12">
                <VStack className="flex-1 p-4" space="2xl">
                  <VerifyOtpHeader />
                  <VerifyOtpForm />
                </VStack>
              </ScrollView>
              <VerifyOtpFooter />
            </VStack>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </VerifyOtpProvider>
    </>
  )
}
