import { ROUTE } from '@/lib/routes'
import { useGlobalStore } from '@/store/global/store'
import { useNavigation } from 'expo-router'
import { createContext, use } from 'react'

interface HomeScreenContextValue {
  handleLogout: () => void
}

const HomeScreenContext = createContext<HomeScreenContextValue | undefined>(undefined)

export function HomeScreenProvider({ children }: { children?: React.ReactNode }) {
  const navigation = useNavigation()
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn)

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigation.reset({ index: 0, routes: [{ name: ROUTE.LOGIN as never }] })
  }

  return <HomeScreenContext value={{ handleLogout }}>{children}</HomeScreenContext>
}

export function useHomeScreenContext() {
  const context = use(HomeScreenContext)

  if (!context) {
    throw new Error('useHomeScreenContext must be used within a HomeScreenProvider')
  }

  return context
}
