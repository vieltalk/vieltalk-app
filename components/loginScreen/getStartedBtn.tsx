import { ROUTE } from '@/lib/routes'
import { Trans } from '@lingui/react/macro'
import { Link } from 'expo-router'
import { Box } from '../ui/box'
import { Button, ButtonText } from '../ui/button'

export function GetStartedBtn() {
  return (
    <Box className="p-4">
      <Link href={ROUTE.PRIVACY_PERMISSION} asChild>
        <Button size="xl">
          <ButtonText>
            <Trans>Get Started</Trans>
          </ButtonText>
        </Button>
      </Link>
    </Box>
  )
}
