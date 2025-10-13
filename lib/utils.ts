import { clsx, type ClassValue } from 'clsx'
import * as Contacts from 'expo-contacts'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomNumBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export async function registerForPushNotificationsAsync(): Promise<string> {
  let token = ''

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('messages', {
      name: 'Messages',
      importance: Notifications.AndroidImportance.MAX,
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      return token
    }

    try {
      token = (await Notifications.getDevicePushTokenAsync()).data
    } catch (e) {
      token = `${e}`
    }
  }

  return token
}

export async function getContactsAsync(): Promise<Contacts.Contact[]> {
  const { status } = await Contacts.requestPermissionsAsync()

  if (status === 'granted') {
    const contacts = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers],
    })
    return contacts.data
  }

  return []
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  if (/[^0-9]/.test(phoneNumber)) {
    return false
  }

  if (!phoneNumber.startsWith('0')) {
    phoneNumber = `0${phoneNumber}`
  }

  return phoneNumber.length === 9 || phoneNumber.length === 10
}
