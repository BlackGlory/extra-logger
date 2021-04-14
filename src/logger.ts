import { Getter } from 'hotypes'
import { isFunction } from '@blackglory/types'
import { consoleTransports } from './console-transports'
import { Level } from './level'
import { ILog, ITransport, ITransports, ILogger } from './types'

export class Logger<T extends Partial<ILog> = {}> implements ILogger<T> {
  constructor(
    private getLevel: Level | Getter<Level>
  , private defaultTransport?:
    | ITransport<
      | T[Level.Trace]
      | T[Level.Debug]
      | T[Level.Info]
      | T[Level.Warn]
      | T[Level.Error]
      | T[Level.Fatal]
      >
    | Partial<ITransports<{
        [Level.Trace]: T[Level.Trace]
        [Level.Debug]: T[Level.Debug]
        [Level.Info]: T[Level.Info]
        [Level.Warn]: T[Level.Warn]
        [Level.Error]: T[Level.Error]
        [Level.Fatal]: T[Level.Fatal]
      }>>
  ) {}

  trace<U extends T[Level.Trace]>(createLog: U | Getter<U>): void
  trace<U extends T[Level.Trace], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  trace<U extends T[Level.Trace], V>(...args:
  | [createLog: U | Getter<U>]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Trace) return

    let log: U
    if (args.length === 1) {
      const [createLog] = args
      log = getValue(createLog)
    } else {
      const [collect, createLog] = args
      log = createLog(collect())
    }

    if (isFunction(this.defaultTransport)) {
      this.defaultTransport(log)
    } else {
      ;(this.defaultTransport?.[Level.Trace] ?? consoleTransports[Level.Trace])(log)
    }
  }

  debug<U extends T[Level.Debug]>(createLog: U | Getter<U>): void
  debug<U extends T[Level.Debug], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  debug<U extends T[Level.Debug], V>(...args:
  | [createLog: U | Getter<U>]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Debug) return

    let log: U
    if (args.length === 1) {
      const [createLog] = args
      log = getValue(createLog)
    } else {
      const [collect, createLog] = args
      log = createLog(collect())
    }

    if (isFunction(this.defaultTransport)) {
      this.defaultTransport(log)
    } else {
      ;(this.defaultTransport?.[Level.Debug] ?? consoleTransports[Level.Debug])(log)
    }
  }

  info<U extends T[Level.Info]>(createLog: U | Getter<U>): void
  info<U extends T[Level.Info], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  info<U extends T[Level.Info], V>(...args:
  | [createLog: U | Getter<U>]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Info) return

    let log: U
    if (args.length === 1) {
      const [createLog] = args
      log = getValue(createLog)
    } else {
      const [collect, createLog] = args
      log = createLog(collect())
    }

    if (isFunction(this.defaultTransport)) {
      this.defaultTransport(log)
    } else {
      ;(this.defaultTransport?.[Level.Info] ?? consoleTransports[Level.Info])(log)
    }
  }

  warn<U extends T[Level.Warn]>(createLog: U | Getter<U>): void
  warn<U extends T[Level.Warn], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  warn<U extends T[Level.Warn], V>(...args:
  | [createLog: U | Getter<U>]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Warn) return

    let log: U
    if (args.length === 1) {
      const [createLog] = args
      log = getValue(createLog)
    } else {
      const [collect, createLog] = args
      log = createLog(collect())
    }

    if (isFunction(this.defaultTransport)) {
      this.defaultTransport(log)
    } else {
      ;(this.defaultTransport?.[Level.Warn] ?? consoleTransports[Level.Warn])(log)
    }
  }

  error<U extends T[Level.Error]>(createLog: U | Getter<U>): void
  error<U extends T[Level.Error], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  error<U extends T[Level.Error], V>(...args:
  | [createLog: U | Getter<U>]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Error) return

    let log: U
    if (args.length === 1) {
      const [createLog] = args
      log = getValue(createLog)
    } else {
      const [collect, createLog] = args
      log = createLog(collect())
    }

    if (isFunction(this.defaultTransport)) {
      this.defaultTransport(log)
    } else {
      ;(this.defaultTransport?.[Level.Error] ?? consoleTransports[Level.Error])(log)
    }
  }

  fatal<U extends T[Level.Fatal]>(createLog: U | Getter<U>): void
  fatal<U extends T[Level.Fatal], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  fatal<U extends T[Level.Fatal], V>(...args:
  | [createLog: U | Getter<U>]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Fatal) return

    let log: U
    if (args.length === 1) {
      const [createLog] = args
      log = getValue(createLog)
    } else {
      const [collect, createLog] = args
      log = createLog(collect())
    }

    if (isFunction(this.defaultTransport)) {
      this.defaultTransport(log)
    } else {
      ;(this.defaultTransport?.[Level.Fatal] ?? consoleTransports[Level.Fatal])(log)
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
