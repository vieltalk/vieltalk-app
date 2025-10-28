import { ROUTE } from '@/lib/routes'
import { useGlobalStore } from '@/store/global/store'
import { useRouter } from 'expo-router'
import { createContext, use } from 'react'

interface HomeScreenContextValue {
  handleLogout: () => void
}

const HomeScreenContext = createContext<HomeScreenContextValue | undefined>(undefined)

export function HomeScreenProvider({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn)

  const handleLogout = () => {
    setIsLoggedIn(false)
    router.replace(ROUTE.LOGIN)
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
