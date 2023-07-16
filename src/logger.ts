import { Getter, isPromiseLike } from '@blackglory/prelude'
import { ITransport, Level } from '@src/types.js'
import { getValue } from '@utils/get-value.js'
import { measureElapsedTime } from '@utils/measure-elapsed-time.js'

export interface ILoggerOptions {
  level: Level
  transport: ITransport
  namespace?: string
}

export class Logger {
  constructor(private options: ILoggerOptions) {}

  trace(message: string | Getter<string>, elapsedTime?: number): void {
    this.logByLevel(Level.Trace, message, elapsedTime)
  }

  info(message: string | Getter<string>, elapsedTime?: number): void {
    this.logByLevel(Level.Info, message, elapsedTime)
  }

  debug(message: string | Getter<string>, elapsedTime?: number): void {
    this.logByLevel(Level.Debug, message, elapsedTime)
  }

  warn(message: string | Getter<string>, elapsedTime?: number): void {
    this.logByLevel(Level.Warn, message, elapsedTime)
  }

  error(message: string | Getter<string>, elapsedTime?: number): void {
    this.logByLevel(Level.Error, message, elapsedTime)
  }

  fatal(message: string | Getter<string>, elapsedTime?: number): void {
    this.logByLevel(Level.Fatal, message, elapsedTime)
  }

  traceTime<T>(
    message: string | Getter<string>
  , expression: () => PromiseLike<T>
  ): Promise<T>
  traceTime<T>(
    message: string | Getter<string>
  , expression: () => T
  ): T
  traceTime<T>(
    message: string | Getter<string>
  , expression: () => T | PromiseLike<T>
  ): T | Promise<T> {
    return this.logTimeByLevel(Level.Trace, message, expression)
  }

  infoTime<T>(
    message: string | Getter<string>
  , expression: () => PromiseLike<T>
  ): Promise<T>
  infoTime<T>(
    message: string | Getter<string>
  , expression: () => T
  ): T
  infoTime<T>(
    message: string | Getter<string>
  , expression: () => T | PromiseLike<T>
  ): T | Promise<T> {
    return this.logTimeByLevel(Level.Info, message, expression)
  }

  debugTime<T>(
    message: string | Getter<string>
  , expression: () => PromiseLike<T>
  ): Promise<T>
  debugTime<T>(
    message: string | Getter<string>
  , expression: () => T
  ): T
  debugTime<T>(
    message: string | Getter<string>
  , expression: () => T | PromiseLike<T>
  ): T | Promise<T> {
    return this.logTimeByLevel(Level.Debug, message, expression)
  }

  warnTime<T>(
    message: string | Getter<string>
  , expression: () => PromiseLike<T>
  ): Promise<T>
  warnTime<T>(
    message: string | Getter<string>
  , expression: () => T
  ): T
  warnTime<T>(
    message: string | Getter<string>
  , expression: () => T | PromiseLike<T>
  ): T | Promise<T> {
    return this.logTimeByLevel(Level.Warn, message, expression)
  }

  errorTime<T>(
    message: string | Getter<string>
  , expression: () => PromiseLike<T>
  ): Promise<T>
  errorTime<T>(
    message: string | Getter<string>
  , expression: () => T
  ): T
  errorTime<T>(
    message: string | Getter<string>
  , expression: () => T | PromiseLike<T>
  ): T | Promise<T> {
    return this.logTimeByLevel(Level.Error, message, expression)
  }

  fatalTime<T>(
    message: string | Getter<string>
  , expression: () => PromiseLike<T>
  ): Promise<T>
  fatalTime<T>(
    message: string | Getter<string>
  , expression: () => T
  ): T
  fatalTime<T>(
    message: string | Getter<string>
  , expression: () => T | PromiseLike<T>
  ): T | Promise<T> {
    return this.logTimeByLevel(Level.Fatal, message, expression)
  }

  traceTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => PromiseLike<Result>
  ): (...args: Args) => Promise<Result>
  traceTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result
  traceTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result | Promise<Result> {
    return this.logTimeFunctionByLevel(Level.Trace, message, fn)
  }

  infoTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => PromiseLike<Result>
  ): (...args: Args) => Promise<Result>
  infoTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result
  infoTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result | Promise<Result> {
    return this.logTimeFunctionByLevel(Level.Info, message, fn)
  }

  debugTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => PromiseLike<Result>
  ): (...args: Args) => Promise<Result>
  debugTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result
  debugTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result | Promise<Result> {
    return this.logTimeFunctionByLevel(Level.Debug, message, fn)
  }

  warnTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => PromiseLike<Result>
  ): (...args: Args) => Promise<Result>
  warnTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result
  warnTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result | Promise<Result> {
    return this.logTimeFunctionByLevel(Level.Warn, message, fn)
  }

  errorTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => PromiseLike<Result>
  ): (...args: Args) => Promise<Result>
  errorTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result
  errorTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result | Promise<Result> {
    return this.logTimeFunctionByLevel(Level.Error, message, fn)
  }

  fatalTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => PromiseLike<Result>
  ): (...args: Args) => Promise<Result>
  fatalTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result
  fatalTimeFunction<Result, Args extends unknown[]>(
    message: string | Getter<string>
  , fn: (...args: Args) => Result
  ): (...args: Args) => Result | Promise<Result> {
    return this.logTimeFunctionByLevel(Level.Fatal, message, fn)
  }

  private logByLevel(
    level: Level
  , message: string | Getter<string>
  , elapsedTime?: number
  ): void {
    if (this.options.level <= level) {
      this.send(level, message, elapsedTime)
    }
  }

  private logTimeByLevel<T>(
    level: Level
  , message: string | Getter<string>
  , expression: () => T | PromiseLike<T>
  ): T | Promise<T> {
    if (this.options.level <= level) {
      return measureElapsedTime<T>(
        expression
      , elapsedTime => this.send(level, message, elapsedTime)
      )
    } else {
      const result = expression()
      if (isPromiseLike(result)) {
        return Promise.resolve(result)
      } else {
        return result
      }
    }
  }

  private logTimeFunctionByLevel<Result, Args extends unknown[]>(
    level: Level
  , message: string | Getter<string>
  , fn: (...args: Args) => Result | PromiseLike<Result>
  ): (...args: Args) => Result | Promise<Result> {
    if (this.options.level <= level) {
      return (...args: Args) => {
        return measureElapsedTime(
          () => fn(...args)
        , elapsedTime => this.send(level, message, elapsedTime)
        )
      }
    } else {
      return (...args: Args) => {
        const result = fn(...args)
        if (isPromiseLike(result)) {
          return Promise.resolve(result)
        } else {
          return result
        }
      }
    }
  }

  private send(
    level: Level
  , message: string | Getter<string>
  , elapsedTime?: number
  ): void {
    this.options.transport.send({
      level
    , message: getValue(message)
    , namespace: this.options.namespace
    , timestamp: Date.now()
    , elapsedTime
    })
  }
}
