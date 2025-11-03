import { useGlobalStore } from '@/store/global/store'
import { createContext, use, useEffect, useRef } from 'react'
import { getUniqueIdSync } from 'react-native-device-info'
import { Socket, io } from 'socket.io-client'

interface SocketIoContextValue {
  socket: Socket
}

const SocketIoContext = createContext<SocketIoContextValue | undefined>(undefined)

export function SocketIoProvider({ children }: { children?: React.ReactNode }) {
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn)
  const userInfo = useGlobalStore((state) => state.userInfo)
  const socket = useRef<Socket>(io(process.env.EXPO_PUBLIC_SOCKET_BASE_URL, { autoConnect: false }))

  useEffect(() => {
    if (!isLoggedIn || !userInfo?.id) return

    const socketRef = socket.current

    socketRef.io.opts.query = { userId: userInfo.id, deviceId: getUniqueIdSync() }

    socketRef.connect()

    socketRef.on('connect', () => {
      console.log('Socket connected')
    })

    socketRef.on('connect_error', (error) => {
      console.log('Socket connect error', JSON.stringify(error, null, 2))
    })

    socketRef.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socketRef.on('disconnecting', () => {
      console.log('Socket disconnecting')
    })

    return () => {
      socketRef.off('connect')
      socketRef.off('connect_error')
      socketRef.off('disconnect')
      socketRef.off('disconnecting')
      socketRef.disconnect()
    }
  }, [isLoggedIn, userInfo?.id])

  return <SocketIoContext value={{ socket: socket.current }}>{children}</SocketIoContext>
}

export function useSocketIoContext() {
  const context = use(SocketIoContext)

  if (!context) {
    throw new Error('useSocketIoContext must be used within a SocketIoProvider')
  }

  return context
}
