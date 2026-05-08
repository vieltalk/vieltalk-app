import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { Trans } from '@lingui/react/macro'
import { Shield } from 'lucide-react-native'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'

export function PrivacyPermissionHeader() {
  return (
    <>
      <Box className="items-center justify-center pb-8 pt-20">
        <Box className="rounded-full bg-primary-500 p-4">
          <Icon as={Shield} className="text-typography-50" size={38} />
        </Box>
      </Box>
      <Heading className="mb-2 text-center">
        <Trans>Privacy & Permissions</Trans>
      </Heading>
      <Text className="text-center">
        <Trans>
          We respect your privacy. Choose what data you&apos;re comfortable sharing to personalize your chat experience.
        </Trans>
      </Text>
    </>
  )
}
