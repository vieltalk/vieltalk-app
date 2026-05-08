import { useInputUsernameScreenContext } from '@/contexts/inputUsernameScreen'
import { Controller } from 'react-hook-form'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '../ui/form-control'
import { Input, InputField } from '../ui/input'
import { VStack } from '../ui/vstack'

export function InputUsernameForm() {
  const { form } = useInputUsernameScreenContext()

  return (
    <VStack space="md">
      <Controller
        control={form.control}
        name="firstName"
        render={({ field, fieldState }) => {
          return (
            <FormControl isRequired isInvalid={fieldState.invalid}>
              <FormControlLabel>
                <FormControlLabelText>First Name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="First Name"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
              </Input>
              <FormControlError>
                <FormControlErrorText>{fieldState.error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )
        }}
      />
      <Controller
        control={form.control}
        name="lastName"
        render={({ field, fieldState }) => {
          return (
            <FormControl isInvalid={fieldState.invalid}>
              <FormControlLabel>
                <FormControlLabelText>Last Name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="Last Name"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
              </Input>
              <FormControlError>
                <FormControlErrorText>{fieldState.error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )
        }}
      />
    </VStack>
  )
}
