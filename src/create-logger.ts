import { isFunction } from '@blackglory/types'
import { Getter } from 'hotypes'
import { Level } from './level'
import { consoleTransports } from './console-transports'
import { ITransport, ITransports, ILogger } from './types'

export function createLogger<TTrace, TDebug, TInfo, TWarn, TError, TFatal>(
  getLevel: Level | Getter<Level>
, defaultTransport?:
  | ITransport<TTrace | TDebug | TInfo | TWarn | TError | TFatal>
  | Partial<ITransports<{
      trace: TTrace
      debug: TDebug
      info: TInfo
      warn: TWarn
      error: TError
      fatal: TFatal
    }>>
): ILogger<{
  trace: TTrace
  debug: TDebug
  info: TInfo
  warn: TWarn
  error: TError
  fatal: TFatal
}> {
  return {
    trace<T extends TTrace>(
      createLog: T | Getter<T>
    , transport?: ITransport<T>
    ): void {
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

  , debug<T extends TDebug>(
      createLog: T | Getter<T>
    , transport?: ITransport<T
    >): void {
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

  , info<T extends TInfo>(
      createLog: T | Getter<T>
    , transport?: ITransport<T>
    ): void {
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

  , warn<T extends TWarn>(
      createLog: T | Getter<T>
    , transport?: ITransport<T>
    ): void {
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

  , error<T extends TError>(
      createLog: T | Getter<T>
    , transport?: ITransport<T>
    ): void {
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

  , fatal<T extends TFatal>(
      createLog: T | Getter<T>
    , transport?: ITransport<T>
    ): void {
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
