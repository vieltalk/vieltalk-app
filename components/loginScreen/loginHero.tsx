import { Trans } from '@lingui/react/macro'
import { Asset } from 'expo-asset'
import { Image } from 'expo-image'
import { Box } from '../ui/box'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

export function LoginHero() {
  return (
    <>
      <Box className="relative flex-1">
        <Box className="absolute left-1/2 top-1/2 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-outline-300"></Box>
        <Box className="absolute left-1/2 top-1/2 size-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-outline-400"></Box>
        <Box className="absolute left-1/2 top-1/2 size-[250px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-outline-500">
          <Image
            source={Asset.fromModule(require('@/assets/images/icon.png'))}
            style={{ width: 120, height: 120 }}
            contentFit="contain"
          />
        </Box>
      </Box>
      <VStack className="p-4" space="md">
        <Heading className="text-center">
          <Trans>Welcome to VielTalk</Trans>
        </Heading>
        <Text className="px-4 text-center text-sm">
          <Trans>Connect freely — where every conversation starts with privacy and speed.</Trans>
        </Text>
      </VStack>
    </>
  )
}
