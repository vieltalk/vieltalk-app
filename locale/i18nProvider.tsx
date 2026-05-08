import { AppLanguage, useGlobalStore } from '@/store/global/store'

import { setupI18n } from '@lingui/core'
import { I18nProvider as DefaultI18nProvider } from '@lingui/react'
import { useEffect, useState } from 'react'
import { messages as enMessages } from './locales/en.po'
import { messages as kmMessages } from './locales/km.po'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const preferredLanguage = useGlobalStore((state) => state.preferredLanguage)

  const [i18n] = useState(() =>
    setupI18n({
      messages: {
        [preferredLanguage]: preferredLanguage === AppLanguage.EN ? enMessages : kmMessages,
      },
    }),
  )

  useEffect(() => {
    switch (preferredLanguage) {
      case AppLanguage.KM:
        i18n.loadAndActivate({ locale: preferredLanguage, messages: kmMessages })
        break
      case AppLanguage.EN:
        i18n.loadAndActivate({ locale: preferredLanguage, messages: enMessages })
        break
      default:
        i18n.loadAndActivate({ locale: AppLanguage.EN, messages: enMessages })
        break
    }
  }, [i18n, preferredLanguage])

  return <DefaultI18nProvider i18n={i18n}>{children}</DefaultI18nProvider>
}
