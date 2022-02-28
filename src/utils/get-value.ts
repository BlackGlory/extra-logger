import { Getter } from 'justypes'
import { isFunction } from '@blackglory/types'

export function getValue<T>(val: T | Getter<T>): T {
  if (isFunction(val)) {
    return val()
  } else {
    return val
  }
}
