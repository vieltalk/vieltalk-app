import { PrivacyPermission } from '@/api/shared.types'
import { usePrivacyPermissionContext } from '@/contexts/privacyPermissionScreen'
import { Trans } from '@lingui/react/macro'
import { useStore } from 'zustand'
import { Button, ButtonText } from '../ui/button'
import { HStack } from '../ui/hstack'

export function PrivacyPermissionFooter() {
  const { stateStore, handleAllowPress, goNextScreen } = usePrivacyPermissionContext()

  const allowedPermissions = useStore(stateStore, (state) => state.allowedPermissions)

  const totalPermissions = Object.values(PrivacyPermission).filter(Number).length

  return (
    <HStack className="items-center justify-between p-4" space="lg">
      <Button size="xl" action="secondary" onPress={goNextScreen}>
        <ButtonText>
          <Trans>Not Now</Trans>
        </ButtonText>
      </Button>
      {allowedPermissions.length > 1 && (
        <Button size="xl" onPress={handleAllowPress}>
          <ButtonText>
            {allowedPermissions.length === totalPermissions && <Trans>Allow All Permissions</Trans>}
            {allowedPermissions.length < totalPermissions && <Trans>Allow Permissions</Trans>}
          </ButtonText>
        </Button>
      )}
    </HStack>
  )
}
