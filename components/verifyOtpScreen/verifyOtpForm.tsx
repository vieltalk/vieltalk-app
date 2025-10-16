import { useVerifyOtpContext } from '@/contexts/verifyOtp'
import { Controller } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { FormControl, FormControlError, FormControlErrorText } from '../ui/form-control'

export function VerifyOtpForm() {
  const { form } = useVerifyOtpContext()

  return (
    <Controller
      control={form.control}
      name="otp"
      render={({ field, fieldState }) => (
        <FormControl isRequired isInvalid={fieldState.invalid}>
          <OtpInput
            numberOfDigits={6}
            onTextChange={field.onChange}
            onBlur={field.onBlur}
            theme={{
              containerStyle: { justifyContent: 'flex-start', gap: 14 },
              focusedPinCodeContainerStyle: { borderColor: '#0c8eeb' },
              focusStickStyle: { backgroundColor: '#0c8eeb' },
              pinCodeContainerStyle: { borderColor: Boolean(fieldState.error) ? '#e63535' : '#DFDFDE' },
            }}
            onFilled={Keyboard.dismiss}
          />
          <FormControlError>
            <FormControlErrorText className="text-error-500">{fieldState.error?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>
      )}
    />
  )
}
