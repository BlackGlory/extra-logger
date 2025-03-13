import { Logger } from '@src/logger.js'
import { Level } from '@src/types.js'
import { jest } from '@jest/globals'

describe('Logger', () => {
  describe.each([
    ['trace', Level.Trace, Level.Trace]
  , ['debug', Level.Debug, Level.Debug]
  , ['info', Level.Info, Level.Info]
  , ['warn', Level.Warn, Level.Warn]
  , ['error', Level.Error, Level.Error]
  , ['fatal', Level.Fatal, Level.Fatal]
  ])('%s', (methodName: string, methodLevel: Level, loggerLevel: Level) => {
    describe.each([
      ['value', 'message']
    , ['getter', () => 'message']
    ])('message: %s', (_, message) => {
      test(`level < ${Level[methodLevel]}`, () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel - 1, transport })

        // @ts-ignore
        const result = logger[methodName](message)

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: undefined
        })
      })

      test(`level = ${Level[methodLevel]}`, () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel, transport })

        // @ts-ignore
        const result = logger[methodName](message)

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: undefined
        })
      })

      test(`level > ${Level[methodLevel]}`, () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel + 1, transport })

        // @ts-ignore
        const result = logger[methodName](message)

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe.each([
    ['traceAsync', Level.Trace, Level.Trace]
  , ['debugAsync', Level.Debug, Level.Debug]
  , ['infoAsync', Level.Info, Level.Info]
  , ['warnAsync', Level.Warn, Level.Warn]
  , ['errorAsync', Level.Error, Level.Error]
  , ['fatalAsync', Level.Fatal, Level.Fatal]
  ])('%s', (methodName: string, methodLevel: Level, loggerLevel: Level) => {
    describe.each([
      ['value', Promise.resolve('message')]
    , ['getter', () => Promise.resolve('message')]
    ])('message: %s', (_, message) => {
      test(`level < ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel - 1, transport })

        // @ts-ignore
        const result = await logger[methodName](message)

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: undefined
        })
      })

      test(`level = ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel, transport })

        // @ts-ignore
        const result = await logger[methodName](message)

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: undefined
        })
      })

      test(`level > ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel + 1, transport })

        // @ts-ignore
        const result = await logger[methodName](message)

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe.each([
    ['traceTime', Level.Trace, Level.Trace]
  , ['debugTime', Level.Debug, Level.Debug]
  , ['infoTime', Level.Info, Level.Info]
  , ['warnTime', Level.Warn, Level.Warn]
  , ['errorTime', Level.Error, Level.Error]
  , ['fatalTime', Level.Fatal, Level.Fatal]
  ])('%s', (methodName: string, methodLevel: Level, loggerLevel: Level) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      ['getter', 'message']
    , ['value', () => 'message']
    ])(`message: %s`, (_, message) => {
      test(`level < ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel - 1, transport })
        const value = {}
        const expression = createExpression(value)

        // @ts-ignore
        const result = logger[methodName](message, expression)

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level = ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel, transport })
        const value = {}
        const expression = createExpression(value)

        // @ts-ignore
        const result = logger[methodName](message, expression)

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level > ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel + 1, transport })
        const value = {}
        const expression = createExpression(value)

        // @ts-ignore
        const result = logger[methodName](message, expression)

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

  describe.each([
    ['traceTimeAsync', Level.Trace, Level.Trace]
  , ['debugTimeAsync', Level.Debug, Level.Debug]
  , ['infoTimeAsync', Level.Info, Level.Info]
  , ['warnTimeAsync', Level.Warn, Level.Warn]
  , ['errorTimeAsync', Level.Error, Level.Error]
  , ['fatalTimeAsync', Level.Fatal, Level.Fatal]
  ])('%s', (methodName: string, methodLevel: Level, loggerLevel: Level) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      ['getter', 'message']
    , ['value', () => 'message']
    ])(`message: %s`, (_, message) => {
      test(`level < ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel - 1, transport })
        const value = {}
        const expression = createExpression(value)

        // @ts-ignore
        const result = await logger[methodName](message, expression)

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level = ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel, transport })
        const value = {}
        const expression = createExpression(value)

        // @ts-ignore
        const result = await logger[methodName](message, expression)

        expect(expression).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level > ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel + 1, transport })
        const value = {}
        const expression = createExpression(value)

        // @ts-ignore
        const result = await logger[methodName](message, expression)

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

  describe.each([
    ['traceTimeFunction', Level.Trace, Level.Trace]
  , ['debugTimeFunction', Level.Debug, Level.Debug]
  , ['infoTimeFunction', Level.Info, Level.Info]
  , ['warnTimeFunction', Level.Warn, Level.Warn]
  , ['errorTimeFunction', Level.Error, Level.Error]
  , ['fatalTimeFunction', Level.Fatal, Level.Fatal]
  ])('%s', (methodName: string, methodLevel: Level, loggerLevel: Level) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      ['getter', 'message']
    , ['value', () => 'message']
    ])(`message: %s`, (_, message) => {
      test(`level < ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel - 1, transport })
        const fn = createFn()
        const value = {}

        // @ts-ignore
        const newFn = logger[methodName](message, fn)
        const result = newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level = ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel, transport })
        const fn = createFn()
        const value = {}

        // @ts-ignore
        const newFn = logger[methodName](message, fn)
        const result = newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level > ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel + 1, transport })
        const fn = createFn()
        const value = {}

        // @ts-ignore
        const newFn = logger[methodName](message, fn)
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

  describe.each([
    ['traceTimeAsyncFunction', Level.Trace, Level.Trace]
  , ['debugTimeAsyncFunction', Level.Debug, Level.Debug]
  , ['infoTimeAsyncFunction', Level.Info, Level.Info]
  , ['warnTimeAsyncFunction', Level.Warn, Level.Warn]
  , ['errorTimeAsyncFunction', Level.Error, Level.Error]
  , ['fatalTimeAsyncFunction', Level.Fatal, Level.Fatal]
  ])('%s', (methodName: string, methodLevel: Level, loggerLevel: Level) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      ['getter', 'message']
    , ['value', () => 'message']
    ])(`message: %s`, (_, message) => {
      test(`level < ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel - 1, transport })
        const fn = createFn()
        const value = {}

        // @ts-ignore
        const newFn = logger[methodName](message, fn)
        const result = await newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level = ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel, transport })
        const fn = createFn()
        const value = {}

        // @ts-ignore
        const newFn = logger[methodName](message, fn)
        const result = await newFn(value)

        expect(fn).toBeCalledTimes(1)
        expect(result).toBe(value)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level > ${Level[methodLevel]}`, async () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel + 1, transport })
        const fn = createFn()
        const value = {}

        // @ts-ignore
        const newFn = logger[methodName](message, fn)
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
