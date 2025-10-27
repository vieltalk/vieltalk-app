import { useInputPhoneScreenContext } from '@/contexts/inputPhoneScreen'
import { Controller } from 'react-hook-form'
import { Divider } from '../ui/divider'
import { FormControl, FormControlError, FormControlErrorText } from '../ui/form-control'
import { HStack } from '../ui/hstack'
import { Input, InputField } from '../ui/input'
import { Text } from '../ui/text'

export function PhoneNumberForm() {
  const { form } = useInputPhoneScreenContext()

  return (
    <Controller
      control={form.control}
      name="phoneNumber"
      render={({ field, fieldState }) => {
        return (
          <FormControl isRequired isInvalid={fieldState.invalid}>
            <Input>
              <HStack className="h-full items-center pl-3" space="md">
                <Text>+855</Text>
                <Divider orientation="vertical" />
              </HStack>
              <InputField
                type="text"
                placeholder="Phone Number"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                keyboardType="phone-pad"
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>{fieldState.error?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )
      }}
    />
  )
}
