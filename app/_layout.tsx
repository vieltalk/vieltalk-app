import 'react-native-get-random-values'

import { QueryClientProvider } from '@/components/queryClientProvider'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import { I18nProvider } from '@/locale/i18nProvider'
import { useGlobalStore } from '@/store/global/store'
import { getAnalytics, logEvent } from '@react-native-firebase/analytics'
import { Stack, usePathname } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const pathname = usePathname()

  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn)

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    ;(async () => {
      logEvent(getAnalytics(), 'screen_view' as any, {
        screen_name: pathname,
        screen_class: pathname,
      })
    })()
  }, [pathname])

  return (
    <QueryClientProvider>
      <GluestackUIProvider mode="light">
        <I18nProvider>
          <Stack>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="login" />
            </Stack.Protected>
          </Stack>
        </I18nProvider>
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </QueryClientProvider>
  )
}
