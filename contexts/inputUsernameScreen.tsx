import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams } from 'expo-router'
import { createContext, use } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

const usernameFormScheme = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().optional(),
})

type UsernameFormScheme = z.infer<typeof usernameFormScheme>

interface InputUsernameScreenContextValue {
  form: UseFormReturn<UsernameFormScheme>
  handleNextPress: () => void
}

const InputUsernameScreenContext = createContext<InputUsernameScreenContextValue | undefined>(undefined)

export function InputUsernameScreenProvider({ children }: { children?: React.ReactNode }) {
  const { phone } = useLocalSearchParams<{ phone: string }>()

  const usernameForm = useForm<UsernameFormScheme>({
    resolver: zodResolver(usernameFormScheme),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  })

  const onSubmit = (data: UsernameFormScheme) => {
    console.log(phone)

    console.log(data)
  }

  return (
    <InputUsernameScreenContext value={{ form: usernameForm, handleNextPress: usernameForm.handleSubmit(onSubmit) }}>
      {children}
    </InputUsernameScreenContext>
  )
}

export function useInputUsernameScreenContext() {
  const context = use(InputUsernameScreenContext)

  if (!context) {
    throw new Error('useInputUsernameScreenContext must be used within a InputUsernameScreenProvider')
  }

  return context
}
