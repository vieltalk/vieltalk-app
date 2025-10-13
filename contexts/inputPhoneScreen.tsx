import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, use } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

const phoneNumberFormScheme = z.object({
  phoneNumber: z.string().min(9).max(10),
})

type PhoneNumberFormScheme = z.infer<typeof phoneNumberFormScheme>

interface InputPhoneScreenContextValue {
  form: UseFormReturn<PhoneNumberFormScheme>
}

const InputPhoneScreenContext = createContext<InputPhoneScreenContextValue | undefined>(undefined)

export function InputPhoneScreenProvider({ children }: { children?: React.ReactNode }) {
  const phoneNumberForm = useForm<PhoneNumberFormScheme>({
    resolver: zodResolver(phoneNumberFormScheme),
    defaultValues: {
      phoneNumber: '',
    },
  })

  return <InputPhoneScreenContext value={{ form: phoneNumberForm }}>{children}</InputPhoneScreenContext>
}

export function useInputPhoneScreenContext() {
  const context = use(InputPhoneScreenContext)

  if (!context) {
    throw new Error('useInputPhoneScreenContext must be used within a InputPhoneScreenProvider')
  }

  return context
}
