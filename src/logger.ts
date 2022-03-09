import { isPromiseLike } from '@blackglory/types'
import { ITransport, Level } from '@src/types'
import { createTimestamp } from '@utils/create-timestamp'
import { getValue } from '@utils/get-value'
import { Getter } from 'justypes'

export interface ILoggerOptions {
  level: Level
  transport: ITransport
  namespace?: string
}

export class Logger {
  constructor(private options: ILoggerOptions) {}

  trace(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Trace) {
      this.options.transport.send({
        level: Level.Trace
      , message: getValue(message)
      , namespace: this.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  info(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Info) {
      this.options.transport.send({
        level: Level.Info
      , message: getValue(message)
      , namespace: this.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  debug(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Debug) {
      this.options.transport.send({
        level: Level.Debug
      , message: getValue(message)
      , namespace: this.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  warn(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Warn) {
      this.options.transport.send({
        level: Level.Warn
      , message: getValue(message)
      , namespace: this.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  error(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Error) {
      this.options.transport.send({
        level: Level.Error
      , message: getValue(message)
      , namespace: this.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  fatal(message: string | Getter<string>, elapsedTime?: number): void {
    if (this.options.level <= Level.Fatal) {
      this.options.transport.send({
        level: Level.Fatal
      , message: getValue(message)
      , namespace: this.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  traceTime<T>(message: string | Getter<string>, expression: () => T): T
  traceTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>
  traceTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    const self = this
    if (this.options.level <= Level.Trace) {
      return this.measureElapsedTime(expression, log)
    } else {
      return expression()
    }

    function log(elapsedTime: number): void {
      self.options.transport.send({
        level: Level.Trace
      , message: getValue(message)
      , namespace: self.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  infoTime<T>(message: string | Getter<string>, expression: () => T): T
  infoTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>
  infoTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    const self = this
    if (this.options.level <= Level.Info) {
      return this.measureElapsedTime(expression, log)
    } else {
      return expression()
    }

    function log(elapsedTime: number): void {
      self.options.transport.send({
        level: Level.Info
      , message: getValue(message)
      , namespace: self.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  debugTime<T>(message: string | Getter<string>, expression: () => T): T
  debugTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>
  debugTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    const self = this
    if (this.options.level <= Level.Debug) {
      return this.measureElapsedTime(expression, log)
    } else {
      return expression()
    }

    function log(elapsedTime: number): void {
      self.options.transport.send({
        level: Level.Debug
      , message: getValue(message)
      , namespace: self.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  warnTime<T>(message: string | Getter<string>, expression: () => T): T
  warnTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>
  warnTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    const self = this
    if (this.options.level <= Level.Warn) {
      return this.measureElapsedTime(expression, log)
    } else {
      return expression()
    }

    function log(elapsedTime: number): void {
      self.options.transport.send({
        level: Level.Warn
      , message: getValue(message)
      , namespace: self.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  errorTime<T>(message: string | Getter<string>, expression: () => T): T
  errorTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>
  errorTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    const self = this
    if (this.options.level <= Level.Error) {
      return this.measureElapsedTime(expression, log)
    } else {
      return expression()
    }

    function log(elapsedTime: number): void {
      self.options.transport.send({
        level: Level.Warn
      , message: getValue(message)
      , namespace: self.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  fatalTime<T>(message: string | Getter<string>, expression: () => T): T
  fatalTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>
  fatalTime<T>(message: string | Getter<string>, expression: () => T | PromiseLike<T>) {
    const self = this
    if (this.options.level <= Level.Fatal) {
      return this.measureElapsedTime(expression, log)
    } else {
      return expression()
    }

    function log(elapsedTime: number): void {
      self.options.transport.send({
        level: Level.Fatal
      , message: getValue(message)
      , namespace: self.options.namespace
      , timestamp: createTimestamp()
      , elapsedTime
      })
    }
  }

  private measureElapsedTime<T>(
    fn: () => T | PromiseLike<T>
  , callback: (elapsedTime: number) => void
  ) {
    const startTime = Date.now()
    const result = fn()
    if (isPromiseLike(result)) {
      return result.then(() => {
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
}
