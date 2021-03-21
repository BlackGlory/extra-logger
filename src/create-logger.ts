import { isFunction } from '@blackglory/types'
import { Getter } from 'hotypes'

export enum Level {
  Trace = 1
, Debug = 2
, Info = 3
, Warn = 4
, Error = 5
, Fatal = 6
, None = Infinity
}

export function createLogger<T>(
  getLevel: Level | Getter<Level>
, defaultTransport: (log: T) => void = console.log
) {
  return {
    trace<U extends T>(createLog: U | Getter<U>, transport: (log: U) => void = defaultTransport): void {
      if (getValue(getLevel) > Level.Trace) return

      transport(getValue(createLog))
    }

  , debug<U extends T>(createLog: U | Getter<U>, transport: (log: U) => void = defaultTransport): void {
      if (getValue(getLevel) > Level.Debug) return

      transport(getValue(createLog))
    }

  , info<U extends T>(createLog: U | Getter<U>, transport: (log: U) => void = defaultTransport): void {
      if (getValue(getLevel) > Level.Info) return

      transport(getValue(createLog))
    }

  , warn<U extends T>(createLog: U | Getter<U>, transport: (log: U) => void = defaultTransport): void {
      if (getValue(getLevel) > Level.Warn) return

      transport(getValue(createLog))
    }

  , error<U extends T>(createLog: U | Getter<U>, transport: (log: U) => void = defaultTransport): void {
      if (getValue(getLevel) > Level.Error) return

      transport(getValue(createLog))
    }

  , fatal<U extends T>(createLog: U | Getter<U>, transport: (log: U) => void = defaultTransport): void {
      if (getValue(getLevel) > Level.Fatal) return

      transport(getValue(createLog))
    }
  }
}

function getValue<T>(param: T | Getter<T>): T {
  if (isFunction(param)) {
    return param()
  } else {
    return param
  }
}
