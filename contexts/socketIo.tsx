import { useGlobalStore } from '@/store/global/store'
import { createContext, use, useEffect, useState } from 'react'
import { getUniqueIdSync } from 'react-native-device-info'
import { Socket, io } from 'socket.io-client'

interface SocketIoContextValue {
  socket: Socket
}

const SocketIoContext = createContext<SocketIoContextValue | undefined>(undefined)

export function SocketIoProvider({ children }: { children?: React.ReactNode }) {
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn)
  const userInfo = useGlobalStore((state) => state.userInfo)

  const [socket] = useState<Socket>(() => io(process.env.EXPO_PUBLIC_SOCKET_BASE_URL, { autoConnect: false }))

  useEffect(() => {
    if (!isLoggedIn || !userInfo?.id) return

    socket.io.opts.query = { userId: userInfo.id, deviceId: getUniqueIdSync() }

    socket.connect()

    socket.on('connect', () => {
      console.log('Socket connected')
    })

    socket.on('connect_error', (error) => {
      console.log('Socket connect error', JSON.stringify(error, null, 2))
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socket.on('disconnecting', () => {
      console.log('Socket disconnecting')
    })

    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('disconnect')
      socket.off('disconnecting')
      socket.disconnect()
    }
  }, [isLoggedIn, userInfo?.id, socket])

  return <SocketIoContext value={{ socket }}>{children}</SocketIoContext>
}

export function useSocketIoContext() {
  const context = use(SocketIoContext)

  if (!context) {
    throw new Error('useSocketIoContext must be used within a SocketIoProvider')
  }

  return context
}
