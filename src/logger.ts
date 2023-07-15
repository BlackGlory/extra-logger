import { Getter, isPromiseLike } from '@blackglory/prelude'
import { ITransport, Level } from '@src/types.js'
import { createTimestamp } from '@utils/create-timestamp.js'
import { getValue } from '@utils/get-value.js'

export interface ILoggerOptions {
  level: Level
  transport: ITransport
  namespace?: string
}

export class Logger {
  constructor(private options: ILoggerOptions) {}

  trace(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Trace) {
      this.sendToTransport(Level.Trace, message, elapsedTime)
    }
  }

  info(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Info) {
      this.sendToTransport(Level.Info, message, elapsedTime)
    }
  }

  debug(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Debug) {
      this.sendToTransport(Level.Debug, message, elapsedTime)
    }
  }

  warn(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Warn) {
      this.sendToTransport(Level.Warn, message, elapsedTime)
    }
  }

  error(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Error) {
      this.sendToTransport(Level.Error, message, elapsedTime)
    }
  }

  fatal(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Fatal) {
      this.sendToTransport(Level.Fatal, message, elapsedTime)
    }
  }

  traceTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): Promise<T>
  traceTime<T>(message: string | Getter<string>, expression: () => T): T
  traceTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    if (this.options.level <= Level.Trace) {
      return this.measureElapsedTime(
        expression
      , elapsedTime => this.sendToTransport(Level.Trace, message, elapsedTime)
      )
    } else {
      return expression()
    }
  }

  infoTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): Promise<T>
  infoTime<T>(message: string | Getter<string>, expression: () => T): T
  infoTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    if (this.options.level <= Level.Info) {
      return this.measureElapsedTime(
        expression
      , elapsedTime => this.sendToTransport(Level.Info, message, elapsedTime)
      )
    } else {
      return expression()
    }
  }

  debugTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): Promise<T>
  debugTime<T>(message: string | Getter<string>, expression: () => T): T
  debugTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    if (this.options.level <= Level.Debug) {
      return this.measureElapsedTime(
        expression
      , elapsedTime => this.sendToTransport(Level.Debug, message, elapsedTime)
      )
    } else {
      return expression()
    }
  }

  warnTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): Promise<T>
  warnTime<T>(message: string | Getter<string>, expression: () => T): T
  warnTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    if (this.options.level <= Level.Warn) {
      return this.measureElapsedTime(
        expression
      , elapsedTime => this.sendToTransport(Level.Warn, message , elapsedTime)
      )
    } else {
      return expression()
    }
  }

  errorTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): Promise<T>
  errorTime<T>(message: string | Getter<string>, expression: () => T): T
  errorTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    if (this.options.level <= Level.Error) {
      return this.measureElapsedTime(
        expression
      , elapsedTime => this.sendToTransport(Level.Error, message, elapsedTime)
      )
    } else {
      return expression()
    }
  }

  fatalTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): Promise<T>
  fatalTime<T>(message: string | Getter<string>, expression: () => T): T
  fatalTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    if (this.options.level <= Level.Fatal) {
      return this.measureElapsedTime(
        expression
      , elapsedTime => this.sendToTransport(Level.Fatal, message, elapsedTime))
    } else {
      return expression()
    }
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
  ): (...args: Args) => Result {
    if (this.options.level <= Level.Trace) {
      return (...args: Args) => {
        return this.measureElapsedTime(
          () => fn(...args)
        , elapsedTime => this.sendToTransport(Level.Trace, message, elapsedTime))
      }
    } else {
      return fn
    }
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
  ): (...args: Args) => Result {
    if (this.options.level <= Level.Info) {
      return (...args: Args) => {
        return this.measureElapsedTime(
          () => fn(...args)
        , elapsedTime => this.sendToTransport(Level.Info, message, elapsedTime))
      }
    } else {
      return fn
    }
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
  ): (...args: Args) => Result {
    if (this.options.level <= Level.Debug) {
      return (...args: Args) => {
        return this.measureElapsedTime(
          () => fn(...args)
        , elapsedTime => this.sendToTransport(Level.Debug, message, elapsedTime))
      }
    } else {
      return fn
    }
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
  ): (...args: Args) => Result {
    if (this.options.level <= Level.Warn) {
      return (...args: Args) => {
        return this.measureElapsedTime(
          () => fn(...args)
        , elapsedTime => this.sendToTransport(Level.Warn, message, elapsedTime))
      }
    } else {
      return fn
    }
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
  ): (...args: Args) => Result {
    if (this.options.level <= Level.Error) {
      return (...args: Args) => {
        return this.measureElapsedTime(
          () => fn(...args)
        , elapsedTime => this.sendToTransport(Level.Error, message, elapsedTime))
      }
    } else {
      return fn
    }
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
  ): (...args: Args) => Result {
    if (this.options.level <= Level.Fatal) {
      return (...args: Args) => {
        return this.measureElapsedTime(
          () => fn(...args)
        , elapsedTime => this.sendToTransport(Level.Fatal, message, elapsedTime))
      }
    } else {
      return fn
    }
  }

  private measureElapsedTime<T>(
    fn: () => PromiseLike<T>
  , callback: (elapsedTime: number) => void
  ): Promise<T>
  private measureElapsedTime<T>(
    fn: () => T
  , callback: (elapsedTime: number) => void
  ): T
  private measureElapsedTime<T>(
    fn: () => T | PromiseLike<T>
  , callback: (elapsedTime: number) => void
  ) {
    const startTime = Date.now()
    const result = fn()
    if (isPromiseLike(result)) {
      return Promise.resolve(result).then(() => {
        const endTime = Date.now()
        callback(endTime - startTime)
        return result
      })
    } else {
      const endTime = Date.now()
      callback(endTime - startTime)
      return result
    }
  }

  private sendToTransport(level: Level, message: string | Getter<string>, elapsedTime?: number) {
    this.options.transport.send({
      level
    , message: getValue(message)
    , namespace: this.options.namespace
    , timestamp: createTimestamp()
    , elapsedTime
    })
  }
}
