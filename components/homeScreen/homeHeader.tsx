import { Bell, Settings } from 'lucide-react-native'
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '../ui/avatar'
import { Box } from '../ui/box'
import { Button, ButtonIcon } from '../ui/button'
import { Heading } from '../ui/heading'
import { HStack } from '../ui/hstack'

export function HomeHeader() {
  return (
    <HStack className="items-center border-b border-outline-200 p-4" space="lg">
      <Avatar>
        <AvatarFallbackText>JD</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        />
        <AvatarBadge />
      </Avatar>
      <Box className="flex-1">
        <Heading size="md">Layhout</Heading>
      </Box>
      <HStack space="lg">
        <Box className="relative">
          <Button size="md" action="secondary" className="rounded-full p-2.5">
            <ButtonIcon as={Bell} />
          </Button>
          <Box className="absolute right-0 top-0 size-[10px] rounded-full bg-red-600"></Box>
        </Box>
        <Button size="md" action="secondary" className="rounded-full p-2.5">
          <ButtonIcon as={Settings} />
        </Button>
      </HStack>
    </HStack>
  )
}
