import { cn } from '@/lib/utils'
import { LegendList } from '@legendapp/list'
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '../ui/avatar'
import { Box } from '../ui/box'
import { Heading } from '../ui/heading'
import { HStack } from '../ui/hstack'
import { Pressable } from '../ui/pressable'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function ChatList() {
  return (
    <LegendList
      data={Array.from({ length: 30 }, (_, i) => ({
        id: i.toString(),
        name: `Chat ${i + 1}`,
        lastMessage: `Last message ${i + 1}`,
        time: `10:00`,
        unreadCount: i,
      }))}
      renderItem={({ item }) => <ChatItem {...item} />}
      keyExtractor={(item) => item.id}
      recycleItems
    />
  )
}

function ChatItem({
  name,
  lastMessage,
  time,
  unreadCount,
}: {
  name: string
  lastMessage: string
  time: string
  unreadCount: number
}) {
  return (
    <Pressable>
      {({ pressed }) => (
        <HStack className={cn('gap-4 border-b border-outline-200 p-4', pressed && 'bg-outline-100')}>
          <Avatar>
            <AvatarFallbackText>JD</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            />
            <AvatarBadge />
          </Avatar>
          <VStack className="flex-1">
            <Heading size="sm" numberOfLines={1}>
              {name}
            </Heading>
            <Text className="text-sm" numberOfLines={1}>
              {lastMessage}
            </Text>
          </VStack>
          <VStack className="items-end justify-between">
            <Text className="text-xs">{time}</Text>
            {unreadCount > 0 && (
              <Box className="size-5 items-center justify-center rounded-full bg-primary-400">
                <Text className="text-xs text-white">{unreadCount}</Text>
              </Box>
            )}
          </VStack>
        </HStack>
      )}
    </Pressable>
  )
}
