import { Stack } from 'expo-router'

export default function onBoardLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" />
      <Stack.Screen name="privacyPermission" />
      <Stack.Screen name="inputPhone" />
      <Stack.Screen name="verifyOtp" />
      <Stack.Screen name="inputUsername" />
      <Stack.Screen name="contactSync" />
    </Stack>
  )
}
