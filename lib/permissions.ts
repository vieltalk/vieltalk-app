import * as Audio from 'expo-audio'
import * as Contacts from 'expo-contacts'
import * as Device from 'expo-device'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { PermissionResponse } from './shared.types'

async function permissionHandler(
  resFn: () => Promise<PermissionResponse>,
  reqFn: () => Promise<PermissionResponse>,
): Promise<boolean> {
  const { status: existingStatus, canAskAgain } = await resFn()

  if (!canAskAgain) {
    return false
  }

  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await reqFn()
    finalStatus = status
  }

  return finalStatus === 'granted'
}

export async function requestContactsPermission(): Promise<boolean> {
  return permissionHandler(Contacts.getPermissionsAsync, Contacts.requestPermissionsAsync)
}

export async function requestNotificationsPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('messages', {
      name: 'Messages',
      importance: Notifications.AndroidImportance.MAX,
    })
  }

  if (Device.isDevice) {
    return permissionHandler(Notifications.getPermissionsAsync, Notifications.requestPermissionsAsync)
  }

  return false
}

export async function requestLocationPermission(): Promise<boolean> {
  return permissionHandler(Location.getForegroundPermissionsAsync, Location.requestForegroundPermissionsAsync)
}

export async function requestCameraPermission(): Promise<boolean> {
  return permissionHandler(ImagePicker.getCameraPermissionsAsync, ImagePicker.requestCameraPermissionsAsync)
}

export async function requestMediaLibraryPermission(): Promise<boolean> {
  return permissionHandler(ImagePicker.getMediaLibraryPermissionsAsync, ImagePicker.requestMediaLibraryPermissionsAsync)
}

export async function requestAudioPermission(): Promise<boolean> {
  return permissionHandler(Audio.getRecordingPermissionsAsync, Audio.requestRecordingPermissionsAsync)
}

export async function getPushNotificationToken(): Promise<string> {
  let token = ''

  if (!(await requestNotificationsPermission())) return token

  try {
    token = (await Notifications.getDevicePushTokenAsync()).data
  } catch (e) {
    token = `${e}`
  }

  return token
}

export async function getContacts(): Promise<Contacts.Contact[]> {
  if (!(await requestContactsPermission())) return []

  try {
    const contacts = await Contacts.getContactsAsync()
    return contacts.data
  } catch {
    return []
  }
}
