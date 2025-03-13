import { Logger } from '@src/logger.js'
import { ITransport, Level } from '@src/types.js'
import { jest } from '@jest/globals'
import { Awaitable, Getter } from '@blackglory/prelude'

describe('Logger', () => {
  describe.each<[
    methodName: (
                  message: string | Getter<string>
                , elapsedTime?: number
                ) => void
  , methodLevel: Level
  , loggerLevel: Level
  ]>([
    [Logger.prototype.trace, Level.Trace, Level.Trace]
  , [Logger.prototype.debug, Level.Debug, Level.Debug]
  , [Logger.prototype.info, Level.Info, Level.Info]
  , [Logger.prototype.warn, Level.Warn, Level.Warn]
  , [Logger.prototype.error, Level.Error, Level.Error]
  , [Logger.prototype.fatal, Level.Fatal, Level.Fatal]
  ])('%s', (method, methodLevel, loggerLevel) => {
    describe.each([
      ['value', 'message']
    , ['getter', () => 'message']
    ])('message: %s', (_, message) => {
      test(`level < ${Level[methodLevel]}`, () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const elapsedTime = 0
        const logger = new Logger({
          level: loggerLevel - 1
        , transport
        , namespace
        })

        Reflect.apply(method, logger, [message, elapsedTime])

        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime
        })
      })

      test(`level = ${Level[methodLevel]}`, () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const elapsedTime = 0
        const logger = new Logger({
          level: loggerLevel
        , transport
        , namespace
        })

        Reflect.apply(method, logger, [message, elapsedTime])

        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime
        })
      })

      test(`level > ${Level[methodLevel]}`, () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const elapsedTime = 0
        const logger = new Logger({
          level: loggerLevel + 1
        , transport
        , namespace
        })

        Reflect.apply(method, logger, [message, elapsedTime])

        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe.each<[
    methodName: (
                  message: Awaitable<string> | Getter<Awaitable<string>>
                , elapsedTime?: number
                ) => Promise<void>
  , methodLevel: Level
  , loggerLevel: Level
  ]>([
    [Logger.prototype.traceAsync, Level.Trace, Level.Trace]
  , [Logger.prototype.debugAsync, Level.Debug, Level.Debug]
  , [Logger.prototype.infoAsync, Level.Info, Level.Info]
  , [Logger.prototype.warnAsync, Level.Warn, Level.Warn]
  , [Logger.prototype.errorAsync, Level.Error, Level.Error]
  , [Logger.prototype.fatalAsync, Level.Fatal, Level.Fatal]
  ])('%s', (method, methodLevel, loggerLevel) => {
    describe.each([
      ['value', Promise.resolve('message')]
    , ['getter', () => Promise.resolve('message')]
    ])('message: %s', (_, message) => {
      test(`level < ${Level[methodLevel]}`, async () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const elapsedTime = 0
        const logger = new Logger({
          level: loggerLevel - 1
        , transport
        , namespace
        })

        await Reflect.apply(method, logger, [message, elapsedTime])

        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime
        })
      })

      test(`level = ${Level[methodLevel]}`, async () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const elapsedTime = 0
        const logger = new Logger({
          level: loggerLevel
        , transport
        , namespace
        })

        await Reflect.apply(method, logger, [message, elapsedTime])

        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime
        })
      })

      test(`level > ${Level[methodLevel]}`, async () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const elapsedTime = 0
        const logger = new Logger({
          level: loggerLevel + 1
        , transport
        , namespace
        })

        await Reflect.apply(method, logger, [message, elapsedTime])

        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe.each<[
    method: <T>(message: string | Getter<string>, expression: () => T) => T
  , methodLevel: Level
  , loggerLevel: Level
  ]>([
    [Logger.prototype.traceTime, Level.Trace, Level.Trace]
  , [Logger.prototype.debugTime, Level.Debug, Level.Debug]
  , [Logger.prototype.infoTime, Level.Info, Level.Info]
  , [Logger.prototype.warnTime, Level.Warn, Level.Warn]
  , [Logger.prototype.errorTime, Level.Error, Level.Error]
  , [Logger.prototype.fatalTime, Level.Fatal, Level.Fatal]
  ])('%s', (method, methodLevel, loggerLevel) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      ['getter', 'message']
    , ['value', () => 'message']
    ])(`message: %s`, (_, message) => {
      test(`level < ${Level[methodLevel]}`, () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel - 1
        , transport
        , namespace
        })
        const value = {}
        const expression = createExpression(value)

        const result = Reflect.apply(method, logger, [message, expression])

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level = ${Level[methodLevel]}`, () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel
        , transport
        , namespace
        })
        const value = {}
        const expression = createExpression(value)

        const result = Reflect.apply(method, logger, [message, expression])

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level > ${Level[methodLevel]}`, () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel + 1
        , transport
        , namespace
        })
        const value = {}
        const expression = createExpression(value)

        const result = Reflect.apply(method, logger, [message, expression])

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).not.toBeCalled()
      })
    })

    function createExpression(value: unknown) {
      return jest.fn(() => {
        jest.advanceTimersByTime(100)
        return value
      })
    }
  })

  describe.each<[
    method: <T>(
              message: Awaitable<string> | Getter<Awaitable<string>>
            , expression: () => Awaitable<T>
            ) => Promise<T>
  , methodLevel: Level
  , loggerLevel: Level
  ]>([
    [Logger.prototype.traceTimeAsync, Level.Trace, Level.Trace]
  , [Logger.prototype.debugTimeAsync, Level.Debug, Level.Debug]
  , [Logger.prototype.infoTimeAsync, Level.Info, Level.Info]
  , [Logger.prototype.warnTimeAsync, Level.Warn, Level.Warn]
  , [Logger.prototype.errorTimeAsync, Level.Error, Level.Error]
  , [Logger.prototype.fatalTimeAsync, Level.Fatal, Level.Fatal]
  ])('%s', (method, methodLevel, loggerLevel) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      ['getter', Promise.resolve('message')]
    , ['value', () => Promise.resolve('message')]
    ])(`message: %s`, (_, message) => {
      test(`level < ${Level[methodLevel]}`, async () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel - 1
        , transport
        , namespace
        })
        const value = {}
        const expression = createExpression(value)

        const result = await Reflect.apply(method, logger, [message, expression])

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level = ${Level[methodLevel]}`, async () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel
        , transport
        , namespace
        })
        const value = {}
        const expression = createExpression(value)

        const result = await Reflect.apply(method, logger, [message, expression])

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level > ${Level[methodLevel]}`, async () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel + 1
        , transport
        , namespace
        })
        const value = {}
        const expression = createExpression(value)

        const result = await Reflect.apply(method, logger, [message, expression])

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).not.toBeCalled()
      })

      function createExpression(value: unknown) {
        return jest.fn(() => {
          jest.advanceTimersByTime(20)

          return new Promise<unknown>(resolve => {
            jest.advanceTimersByTime(80)
            resolve(value)
          })
        })
      }
    })
  })

  describe.each<[
    method: <Result, Args extends unknown[]>(
              message: string | Getter<string>
            , fn: (...args: Args) => Result
            ) => (...args: Args) => Result
  , methodLevel: Level
  , loggerLevel: Level
  ]>([
    [Logger.prototype.traceTimeFunction, Level.Trace, Level.Trace]
  , [Logger.prototype.debugTimeFunction, Level.Debug, Level.Debug]
  , [Logger.prototype.infoTimeFunction, Level.Info, Level.Info]
  , [Logger.prototype.warnTimeFunction, Level.Warn, Level.Warn]
  , [Logger.prototype.errorTimeFunction, Level.Error, Level.Error]
  , [Logger.prototype.fatalTimeFunction, Level.Fatal, Level.Fatal]
  ])('%s', (method, methodLevel, loggerLevel) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      ['getter', 'message']
    , ['value', () => 'message']
    ])(`message: %s`, (_, message) => {
      test(`level < ${Level[methodLevel]}`, () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel - 1
        , transport
        , namespace
        })
        const fn = createFn()
        const value = {}

        const newFn = Reflect.apply(method, logger, [message, fn])
        const result = newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level = ${Level[methodLevel]}`, () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel
        , transport
        , namespace
        })
        const fn = createFn()
        const value = {}

        const newFn = Reflect.apply(method, logger, [message, fn])
        const result = newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level > ${Level[methodLevel]}`, () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel + 1
        , transport
        , namespace
        })
        const fn = createFn()
        const value = {}

        const newFn = Reflect.apply(method, logger, [message, fn])
        const result = newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).not.toBeCalled()
      })
    })

    function createFn() {
      return jest.fn((value: unknown) => {
        jest.advanceTimersByTime(100)
        return value
      })
    }
  })

  describe.each<[
    method: <Result, Args extends unknown[]>(
              message: Awaitable<string> | Getter<Awaitable<string>>
            , fn: (...args: Args) => Awaitable<Result>
            ) => (...args: Args) => Promise<Result>
  , methodLevel: Level
  , loggerLevel: Level
  ]>([
    [Logger.prototype.traceTimeAsyncFunction, Level.Trace, Level.Trace]
  , [Logger.prototype.debugTimeAsyncFunction, Level.Debug, Level.Debug]
  , [Logger.prototype.infoTimeAsyncFunction, Level.Info, Level.Info]
  , [Logger.prototype.warnTimeAsyncFunction, Level.Warn, Level.Warn]
  , [Logger.prototype.errorTimeAsyncFunction, Level.Error, Level.Error]
  , [Logger.prototype.fatalTimeAsyncFunction, Level.Fatal, Level.Fatal]
  ])('%s', (method, methodLevel, loggerLevel) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      ['getter', Promise.resolve('message')]
    , ['value', () => Promise.resolve('message')]
    ])(`message: %s`, (_, message) => {
      test(`level < ${Level[methodLevel]}`, async () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel - 1
        , transport
        , namespace
        })
        const fn = createFn()
        const value = {}

        const newFn = Reflect.apply(method, logger, [message, fn])
        const result = await newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level = ${Level[methodLevel]}`, async () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel
        , transport
        , namespace
        })
        const fn = createFn()
        const value = {}

        const newFn = Reflect.apply(method, logger, [message, fn])
        const result = await newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level > ${Level[methodLevel]}`, async () => {
        const transport: ITransport = { send: jest.fn() }
        const namespace = 'namespace'
        const logger = new Logger({
          level: loggerLevel + 1
        , transport
        , namespace
        })
        const fn = createFn()
        const value = {}

        const newFn = Reflect.apply(method, logger, [message, fn])
        const result = await newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).not.toBeCalled()
      })
    })

    function createFn() {
      return jest.fn((value: unknown) => {
        jest.advanceTimersByTime(20)

        return new Promise<unknown>(resolve => {
          jest.advanceTimersByTime(80)
          resolve(value)
        })
      })
    }
  })
})
