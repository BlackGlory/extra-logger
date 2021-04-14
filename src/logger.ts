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

  trace<U extends T[Level.Trace]>(log: U): void
  trace<U extends T[Level.Trace]>(createLog: Getter<U>): void
  trace<U extends T[Level.Trace], V>(
    params: V
  , createLog: (params: V) => U
  ): void
  trace<U extends T[Level.Trace], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  trace<U extends T[Level.Trace], V>(...args:
  | [log: U]
  | [createLog: Getter<U>]
  | [params: V, createLog: (params: V) => U]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Trace) return

    const log = parseArgsToGetLog(args)
    this.callTransport(Level.Trace, log)
  }

  debug<U extends T[Level.Debug]>(log: U): void
  debug<U extends T[Level.Debug]>(createLog: Getter<U>): void
  debug<U extends T[Level.Debug], V>(
    params: V
  , createLog: (params: V) => U
  ): void
  debug<U extends T[Level.Debug], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  debug<U extends T[Level.Debug], V>(...args:
  | [log: U]
  | [createLog: Getter<U>]
  | [params: V, createLog: (params: V) => U]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Debug) return

    const log = parseArgsToGetLog(args)
    this.callTransport(Level.Debug, log)
  }

  info<U extends T[Level.Info]>(log: U): void
  info<U extends T[Level.Info]>(createLog: Getter<U>): void
  info<U extends T[Level.Info], V>(
    params: V
  , createLog: (params: V) => U
  ): void
  info<U extends T[Level.Info], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  info<U extends T[Level.Info], V>(...args:
  | [log: U]
  | [createLog: Getter<U>]
  | [params: V, createLog: (params: V) => U]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Info) return

    const log = parseArgsToGetLog(args)
    this.callTransport(Level.Info, log)
  }

  warn<U extends T[Level.Warn]>(log: U): void
  warn<U extends T[Level.Warn]>(createLog: Getter<U>): void
  warn<U extends T[Level.Warn], V>(
    params: V
  , createLog: (params: V) => U
  ): void
  warn<U extends T[Level.Warn], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  warn<U extends T[Level.Warn], V>(...args:
  | [log: U]
  | [createLog: Getter<U>]
  | [params: V, createLog: (params: V) => U]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Warn) return

    const log = parseArgsToGetLog(args)
    this.callTransport(Level.Warn, log)
  }

  error<U extends T[Level.Error]>(log: U): void
  error<U extends T[Level.Error]>(createLog: Getter<U>): void
  error<U extends T[Level.Error], V>(
    params: V
  , createLog: (params: V) => U
  ): void
  error<U extends T[Level.Error], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  error<U extends T[Level.Error], V>(...args:
  | [log: U]
  | [createLog: Getter<U>]
  | [params: V, createLog: (params: V) => U]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Error) return

    const log = parseArgsToGetLog(args)
    this.callTransport(Level.Error, log)
  }

  fatal<U extends T[Level.Fatal]>(log: U): void
  fatal<U extends T[Level.Fatal]>(createLog: Getter<U>): void
  fatal<U extends T[Level.Fatal], V>(
    params: V
  , createLog: (params: V) => U
  ): void
  fatal<U extends T[Level.Fatal], V>(
    collect: () => V
  , createLog: (params: V) => U
  ): void
  fatal<U extends T[Level.Fatal], V>(...args:
  | [log: U]
  | [createLog: Getter<U>]
  | [params: V, createLog: (params: V) => U]
  | [collect: () => V, createLog: (params: V) => U]
  ): void {
    const level = getValue(this.getLevel)
    if (level > Level.Fatal) return

    const log = parseArgsToGetLog(args)
    this.callTransport(Level.Fatal, log)
  }

  private callTransport<T>(level: Exclude<Level, Level.None>, log: T) {
    if (isFunction(this.defaultTransport)) {
      this.defaultTransport(log)
    } else {
      ;(this.defaultTransport?.[level] ?? consoleTransports[level])(log)
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

function parseArgsToGetLog<T, U>(args:
| [log: U]
| [createLog: Getter<U>]
| [params: T, createLog: (params: T) => U]
| [collect: () => T, createLog: (params: T) => U]
): U {
  if (args.length === 1) {
    const [createLog] = args
    return getValue(createLog)
  } else {
    const [collect, createLog] = args
    return createLog(getValue(collect))
  }
}
