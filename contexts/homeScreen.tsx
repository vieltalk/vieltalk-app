import { createContext, use } from 'react'

interface HomeScreenContextValue {}

const HomeScreenContext = createContext<HomeScreenContextValue | undefined>(undefined)

export function HomeScreenProvider({ children }: { children?: React.ReactNode }) {
  return <HomeScreenContext value={{}}>{children}</HomeScreenContext>
}

export function useHomeScreenContext() {
  const context = use(HomeScreenContext)

  if (!context) {
    throw new Error('useHomeScreenContext must be used within a HomeScreenProvider')
  }

  return context
}
