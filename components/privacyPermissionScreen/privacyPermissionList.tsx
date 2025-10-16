import { Badge, BadgeText } from '@/components/ui/badge'
import { Box } from '@/components/ui/box'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { usePrivacyPermissionContext } from '@/contexts/privacyPermissionScreen'
import { cn } from '@/lib/utils'
import { Trans } from '@lingui/react/macro'
import { ExternalLink } from 'lucide-react-native'
import { useStore } from 'zustand'
import { Skeleton, SkeletonText } from '../ui/skeleton'
import { Switch } from '../ui/switch'
import { PrivacyIcon } from './privacyIcon'

export function PrivacyPermissionListing() {
  const { privacyQuery, stateStore } = usePrivacyPermissionContext()

  const allowedPermissions = useStore(stateStore, (state) => state.allowedPermissions)
  const setAllowedPermissions = useStore(stateStore, (state) => state.setAllowedPermissions)

  return (
    <VStack className="mt-4" space="lg">
      {privacyQuery.isFetching &&
        Array.from({ length: 3 }, (_, i) => (
          <Card variant="outline" key={i}>
            <HStack space="lg" className="items-start">
              <Skeleton variant="circular" className="h-12 w-12" />
              <VStack className="flex-1" space="lg">
                <SkeletonText _lines={1} className="h-3" />
                <SkeletonText _lines={3} className="h-1" />
              </VStack>
            </HStack>
          </Card>
        ))}
      {privacyQuery.data?.map((item, i) => (
        <Card variant="outline" key={i}>
          <HStack space="lg" className="items-start">
            <Box className={cn('rounded-full bg-background-200 p-3', { 'bg-primary-200': item.require })}>
              <Icon as={PrivacyIcon({ id: item.id })} className={cn({ 'text-primary-500': item.require })} />
            </Box>
            <VStack className="flex-1">
              <HStack className="items-center justify-between">
                <Heading size="sm">{item.title}</Heading>
                {item.require ? (
                  <Badge size="sm" action="info" variant="outline">
                    <BadgeText>
                      <Trans>required</Trans>
                    </BadgeText>
                  </Badge>
                ) : (
                  <Switch
                    size="sm"
                    value={allowedPermissions.includes(item.id)}
                    onValueChange={(value) =>
                      setAllowedPermissions((prev) =>
                        value ? [...prev, item.id] : prev.filter((id) => id !== item.id),
                      )
                    }
                  />
                )}
              </HStack>
              <Text size="sm" className="mt-2">
                {item.content}
              </Text>
              {item.require && (
                <HStack>
                  <Button variant="link" size="sm">
                    <ButtonText>
                      <Trans>Learn More</Trans>
                    </ButtonText>
                    <ButtonIcon as={ExternalLink} />
                  </Button>
                </HStack>
              )}
            </VStack>
          </HStack>
        </Card>
      ))}
    </VStack>
  )
}
