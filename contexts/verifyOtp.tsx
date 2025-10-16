import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams } from 'expo-router'
import { createContext, use } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

const verifyOtpFormScheme = z.object({
  otp: z.string().min(6).max(6),
})

type VerifyOtpFormScheme = z.infer<typeof verifyOtpFormScheme>

interface VerifyOtpContextValue {
  phone: string
  form: UseFormReturn<VerifyOtpFormScheme>
}

const VerifyOtpContext = createContext<VerifyOtpContextValue | undefined>(undefined)

export function VerifyOtpProvider({ children }: { children?: React.ReactNode }) {
  const { phone } = useLocalSearchParams<{ phone: string }>()

  const verifyOtpForm = useForm<VerifyOtpFormScheme>({
    resolver: zodResolver(verifyOtpFormScheme),
    defaultValues: {
      otp: '',
    },
  })

  return <VerifyOtpContext value={{ phone, form: verifyOtpForm }}>{children}</VerifyOtpContext>
}

export function useVerifyOtpContext() {
  const context = use(VerifyOtpContext)

  if (!context) {
    throw new Error('useVerifyOtpContext must be used within a VerifyOtpProvider')
  }

  return context
}
