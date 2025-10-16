import { PrivacyPermission } from '@/api/shared.types'
import { Bell, Camera, CircleQuestionMark, MapPin, Shield, Users } from 'lucide-react-native'

export function PrivacyIcon({ id }: { id: PrivacyPermission }) {
  switch (id) {
    case PrivacyPermission.PRIVACY:
      return Shield
    case PrivacyPermission.CONTACTS:
      return Users
    case PrivacyPermission.NOTIFICATIONS:
      return Bell
    case PrivacyPermission.LOCATION:
      return MapPin
    case PrivacyPermission.CAMERA:
      return Camera
    default:
      return CircleQuestionMark
  }
}
