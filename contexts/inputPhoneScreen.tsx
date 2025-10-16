import { ROUTE } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { createContext, use } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

const phoneNumberFormScheme = z
  .object({
    phoneNumber: z.string(),
  })
  .refine(
    (data) => {
      if (data.phoneNumber.startsWith('0')) {
        return data.phoneNumber.length === 9 || data.phoneNumber.length === 10
      }
      return data.phoneNumber.length === 8 || data.phoneNumber.length === 9
    },
    {
      path: ['phoneNumber'],
      message: 'Invalid phone number',
    },
  )

type PhoneNumberFormScheme = z.infer<typeof phoneNumberFormScheme>

interface InputPhoneScreenContextValue {
  form: UseFormReturn<PhoneNumberFormScheme>
  handleNextPress: () => void
}

const InputPhoneScreenContext = createContext<InputPhoneScreenContextValue | undefined>(undefined)

export function InputPhoneScreenProvider({ children }: { children?: React.ReactNode }) {
  const router = useRouter()

  const phoneNumberForm = useForm<PhoneNumberFormScheme>({
    resolver: zodResolver(phoneNumberFormScheme),
    defaultValues: {
      phoneNumber: '',
    },
  })

  const onSubmit = (data: PhoneNumberFormScheme) => {
    const phone = data.phoneNumber.startsWith('0') ? data.phoneNumber.slice(1) : data.phoneNumber
    router.push(`${ROUTE.VERIFY_OTP}?phone=855${phone}`)
  }

  return (
    <InputPhoneScreenContext value={{ form: phoneNumberForm, handleNextPress: phoneNumberForm.handleSubmit(onSubmit) }}>
      {children}
    </InputPhoneScreenContext>
  )
}

export function useInputPhoneScreenContext() {
  const context = use(InputPhoneScreenContext)

  if (!context) {
    throw new Error('useInputPhoneScreenContext must be used within a InputPhoneScreenProvider')
  }

  return context
}
