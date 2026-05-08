import { InputUsernameScreenProvider } from '@/contexts/inputUsernameScreen'
import { Stack } from 'expo-router'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VStack } from '../ui/vstack'
import { InputUsernameForm } from './inputUsernameForm'
import { InputUsernameHeader } from './inputUsernameHeader'
import { InputUsernameNextBtn } from './inputUsernameNextBtn'

export function InputUsernameScreen() {
  return (
    <>
      <Stack.Screen options={{ headerTransparent: true, title: '' }} />
      <InputUsernameScreenProvider>
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <VStack className="flex-1">
              <ScrollView className="pt-12">
                <VStack className="flex-1 p-4" space="2xl">
                  <InputUsernameHeader />
                  <InputUsernameForm />
                </VStack>
              </ScrollView>
              <InputUsernameNextBtn />
            </VStack>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </InputUsernameScreenProvider>
    </>
  )
}
