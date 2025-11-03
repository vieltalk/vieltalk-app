import { ROUTE } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { createContext, use } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { z } from 'zod'

const verifyOtpFormScheme = z.object({
  otp: z.string().min(6, 'Invalid OTP').max(6, 'Invalid OTP'),
})

type VerifyOtpFormScheme = z.infer<typeof verifyOtpFormScheme>

interface VerifyOtpContextValue {
  phone: string
  form: UseFormReturn<VerifyOtpFormScheme>
  onFilledOtp: () => void
}

const VerifyOtpContext = createContext<VerifyOtpContextValue | undefined>(undefined)

export function VerifyOtpScreenProvider({ children }: { children?: React.ReactNode }) {
  const { phone } = useLocalSearchParams<{ phone: string }>()
  const router = useRouter()

  const verifyOtpForm = useForm<VerifyOtpFormScheme>({
    resolver: zodResolver(verifyOtpFormScheme),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = (data: VerifyOtpFormScheme) => {
    Keyboard.dismiss()
    if (data.otp === '111111') {
      router.push(ROUTE.CONTACT_SYNC)
    }
  }

  return (
    <VerifyOtpContext value={{ phone, form: verifyOtpForm, onFilledOtp: verifyOtpForm.handleSubmit(onSubmit) }}>
      {children}
    </VerifyOtpContext>
  )
}

export function useVerifyOtpScreenContext() {
  const context = use(VerifyOtpContext)

  if (!context) {
    throw new Error('useVerifyOtpScreenContext must be used within a VerifyOtpScreenProvider')
  }

  return context
}
