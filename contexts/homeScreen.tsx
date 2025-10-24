import { useGlobalStore } from '@/store/global/store'
import { createContext, use } from 'react'

interface HomeScreenContextValue {
  handleLogout: () => void
}

const HomeScreenContext = createContext<HomeScreenContextValue | undefined>(undefined)

export function HomeScreenProvider({ children }: { children?: React.ReactNode }) {
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn)

  const handleLogout = () => {
    setIsLoggedIn(false)
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
