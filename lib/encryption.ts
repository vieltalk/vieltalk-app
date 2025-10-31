import { sha256 } from '@noble/hashes/sha2.js'
import { bytesToHex } from '@noble/hashes/utils.js'

export function hashString(str: string): string {
  if (!str) return ''

  return bytesToHex(sha256(new TextEncoder().encode(str)))
}
