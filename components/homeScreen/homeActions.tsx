import { Search } from 'lucide-react-native'
import { FormControl, FormControlError, FormControlErrorText } from '../ui/form-control'
import { HStack } from '../ui/hstack'
import { ChevronDownIcon } from '../ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '../ui/input'
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '../ui/select'
import { VStack } from '../ui/vstack'

export function HomeActions() {
  return (
    <VStack className="border-b border-outline-200 p-4" space="lg">
      <FormControl isInvalid={false}>
        <Input>
          <InputField
            type="text"
            placeholder="Search"
            //   placeholder="First Name"
            //   value={field.value}
            //   onChangeText={field.onChange}
            //   onBlur={field.onBlur}
          />
          <InputSlot className="pr-3">
            <InputIcon as={Search} />
          </InputSlot>
        </Input>
        <FormControlError>
          <FormControlErrorText></FormControlErrorText>
        </FormControlError>
      </FormControl>
      <HStack>
        <Select initialLabel="All Messages" defaultValue="all">
          <SelectTrigger className="border-0">
            <SelectInput className="font-bold" />
            <SelectIcon as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="All Messages" value="all" />
              <SelectItem label="Unread" value="unread" />
              <SelectItem label="Pinned" value="pinned" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>
    </VStack>
  )
}
