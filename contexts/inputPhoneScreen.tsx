import { userOnboard } from '@/api/user'
import { hashString } from '@/lib/encryption'
import { ROUTE } from '@/lib/routes'
import { useGlobalStore } from '@/store/global/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { modelName } from 'expo-device'
import { useRouter } from 'expo-router'
import { createContext, use } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { Platform } from 'react-native'
import { getSystemVersion, getUniqueId } from 'react-native-device-info'
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
  isLoading: boolean
}

const InputPhoneScreenContext = createContext<InputPhoneScreenContextValue | undefined>(undefined)

export function InputPhoneScreenProvider({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn)
  const setUserInfo = useGlobalStore((state) => state.setUserInfo)

  const phoneNumberForm = useForm<PhoneNumberFormScheme>({
    resolver: zodResolver(phoneNumberFormScheme),
    defaultValues: {
      phoneNumber: '',
    },
  })

  const userOnboardMutation = useMutation({
    mutationFn: userOnboard,
    onSuccess: (data) => {
      setIsLoggedIn(true)
      setUserInfo({ id: data._id })
      router.push(ROUTE.CONTACT_SYNC)
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        phoneNumberForm.setError('phoneNumber', {
          message: err.response?.data.message,
        })
      }
    },
  })

  const onSubmit = async (data: PhoneNumberFormScheme) => {
    const phone = data.phoneNumber.startsWith('0') ? data.phoneNumber.slice(1) : data.phoneNumber

    const deviceId = await getUniqueId()
    const deviceModel = modelName || ''
    const osVersion = getSystemVersion()
    const phoneNumber = hashString(phone)

    console.log(
      'userOnboardMutation',
      JSON.stringify(
        {
          avatar: '',
          deviceId,
          phoneNumber,
          deviceType: Platform.OS,
          deviceModel,
          osVersion,
          appVersion: '1.0.0',
        },
        null,
        2,
      ),
    )

    router.push(ROUTE.CONTACT_SYNC)

    // userOnboardMutation.mutate({
    //   avatar: '',
    //   deviceId,
    //   phoneNumber,
    //   deviceType: Platform.OS,
    //   deviceModel,
    //   osVersion,
    //   appVersion: '1.0.0',
    // })
  }

  return (
    <InputPhoneScreenContext
      value={{
        form: phoneNumberForm,
        handleNextPress: phoneNumberForm.handleSubmit(onSubmit),
        isLoading: userOnboardMutation.isPending,
      }}
    >
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
