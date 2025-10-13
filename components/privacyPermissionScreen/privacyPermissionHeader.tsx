import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { Shield } from 'lucide-react-native'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'

export function PrivacyPermissionHeader() {
  return (
    <>
      <Box className="items-center justify-center py-8">
        <Box className="rounded-full bg-primary-500 p-4">
          <Icon as={Shield} className="text-typography-50" size={38} />
        </Box>
      </Box>
      <Heading className="text-center">Privacy & Permissions</Heading>
      <Text className="text-center">
        We respect your privacy. Choose what data you&apos;re comfortable sharing to personalize your chat experience.
      </Text>
    </>
  )
}
