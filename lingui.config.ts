import { defineConfig } from '@lingui/cli'
import { formatter } from '@lingui/format-po'

export default defineConfig({
  sourceLocale: 'en',
  locales: ['en', 'km'],
  catalogs: [
    {
      path: '<rootDir>/locale/locales/{locale}/messages',
      include: ['<rootDir>/app', '<rootDir>/components'],
    },
  ],
  orderBy: 'origin',
  fallbackLocales: {
    km: ['en'],
  },
  format: formatter({ lineNumbers: false }),
})
