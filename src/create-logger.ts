import { isFunction } from '@blackglory/types'
import { Getter } from 'hotypes'
import { Level } from './level'
import { consoleTransports } from './console-transports'
import { ITransport, ITransports } from './types'

export function createLogger<T>(
  getLevel: Level | Getter<Level>
, defaultTransport?: ITransport<T> | Partial<ITransports<T>>
) {
  return {
    trace<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void {
      const level = getValue(getLevel)
      if (level > Level.Trace) return

      const log = getValue(createLog)
      if (transport) {
        transport(log)
      } else if (isFunction(defaultTransport)) {
        defaultTransport(log)
      } else {
        ;(defaultTransport?.[Level.Trace] ?? consoleTransports[Level.Trace])(log)
      }
    }

  , debug<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void {
      if (getValue(getLevel) > Level.Debug) return

      const log = getValue(createLog)
      if (transport) {
        transport(log)
      } else if (isFunction(defaultTransport)) {
        defaultTransport(log)
      } else {
        ;(defaultTransport?.[Level.Debug] ?? consoleTransports[Level.Debug])(log)
      }
    }

  , info<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void {
      if (getValue(getLevel) > Level.Info) return

      const log = getValue(createLog)
      if (transport) {
        transport(log)
      } else if (isFunction(defaultTransport)) {
        defaultTransport(log)
      } else {
        ;(defaultTransport?.[Level.Info] ?? consoleTransports[Level.Info])(log)
      }
    }

  , warn<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void {
      if (getValue(getLevel) > Level.Warn) return

      const log = getValue(createLog)
      if (transport) {
        transport(log)
      } else if (isFunction(defaultTransport)) {
        defaultTransport(log)
      } else {
        ;(defaultTransport?.[Level.Warn] ?? consoleTransports[Level.Warn])(log)
      }
    }

  , error<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void {
      if (getValue(getLevel) > Level.Error) return

      const log = getValue(createLog)
      if (transport) {
        transport(log)
      } else if (isFunction(defaultTransport)) {
        defaultTransport(log)
      } else {
        ;(defaultTransport?.[Level.Error] ?? consoleTransports[Level.Error])(log)
      }
    }

  , fatal<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void {
      if (getValue(getLevel) > Level.Fatal) return

      const log = getValue(createLog)
      if (transport) {
        transport(log)
      } else if (isFunction(defaultTransport)) {
        defaultTransport(log)
      } else {
        ;(defaultTransport?.[Level.Fatal] ?? consoleTransports[Level.Fatal])(log)
      }
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
