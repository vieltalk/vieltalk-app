import axios, { AxiosError, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'
import Aes from 'react-native-aes-crypto'
import AesGcmCrypto from 'react-native-aes-gcm-crypto'
import 'react-native-get-random-values'
import { RSA } from 'react-native-rsa-native'
import { v4 as uuidv4 } from 'uuid'

type AxiosConfigWithMetadata = InternalAxiosRequestConfig & {
  metadata?: {
    axiosId: string
  }
}

async function requestInterceptor(config: AxiosConfigWithMetadata) {
  // TODO: add token to request headers

  const axiosId = uuidv4()

  console.log(
    'outbound request',
    JSON.stringify(
      {
        baseUrl: config.baseURL,
        method: config.method,
        data: config.data,
        params: config.params,
        url: config.url,
        headers: config.headers,
        axiosId,
      },
      null,
      2,
    ),
  )

  const body = config.data

  if (body && !(body instanceof FormData)) {
    const key = await Aes.randomKey(32)

    const encrypted = await AesGcmCrypto.encrypt(JSON.stringify(body), true, key)

    config.data = {
      data: encrypted.content,
      key: await RSA.encrypt(key, process.env.EXPO_PUBLIC_API_PUBLIC_KEY || ''),
      iv: await RSA.encrypt(encrypted.iv, process.env.EXPO_PUBLIC_API_PUBLIC_KEY || ''),
      tag: await RSA.encrypt(encrypted.tag, process.env.EXPO_PUBLIC_API_PUBLIC_KEY || ''),
    }
  }

  config.metadata = {
    axiosId: axiosId,
  }

  return config
}

function responseInterceptor(response: AxiosResponse) {
  console.log(
    'outbound response success',
    JSON.stringify(
      {
        baseUrl: response.config.baseURL,
        url: response.config.url,
        status: `${response.status}:${response.statusText}`,
        headers: response.headers,
        body: response.data,
        axiosId: (response.config as AxiosConfigWithMetadata).metadata?.axiosId,
      },
      null,
      2,
    ),
  )

  return response
}

function responseErrorInterceptor(error: any) {
  // TODO: refresh token
  // TODO: handle error

  if (error instanceof Error) {
    const axiosError = error as AxiosError
    console.log(
      'outbound response failure',
      JSON.stringify(
        {
          baseUrl: axiosError?.response?.config.baseURL,
          url: axiosError?.response?.config.url,
          status: axiosError.response?.status,
          headers: axiosError.response?.headers,
          body: axiosError.response?.data,
          axiosId: (axiosError?.response?.config as AxiosConfigWithMetadata).metadata?.axiosId,
        },
        null,
        2,
      ),
    )
  }

  return Promise.reject(error)
}

const defaultAxiosOptions: CreateAxiosDefaults = {
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
}

export function createApiClient(options?: CreateAxiosDefaults) {
  const instance = axios.create(options || defaultAxiosOptions)

  instance.interceptors.request.use(requestInterceptor)
  instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

  return instance
}

export const apiClient = createApiClient()
export const cdnApiClient = createApiClient({
  baseURL: process.env.EXPO_PUBLIC_CDN_BASE_URL,
})
