import { Logger } from '@src/logger.js'
import { Level } from '@src/types.js'
import { jest } from '@jest/globals'
import { isPromise } from '@blackglory/prelude'

describe('Logger', () => {
  describe.each([
    ['trace', Level.Trace, Level.Trace]
  , ['debug', Level.Debug, Level.Debug]
  , ['info', Level.Info, Level.Info]
  , ['warn', Level.Warn, Level.Warn]
  , ['error', Level.Error, Level.Error]
  , ['fatal', Level.Fatal, Level.Fatal]
  ])('%s', (method: string, methodLevel: Level, loggerLevel: Level) => {
    describe.each([
      ['getter', 'message']
    , ['value', () => 'message']
    ])('message: %s', (_, message) => {
      test(`level < ${Level[methodLevel]}`, () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel - 1, transport })

        // @ts-ignore
        const result = logger[method](message)

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
        const result = logger[method](message)

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
        const result = logger[method](message)

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
  ])('%s', (method: string, methodLevel: Level, loggerLevel: Level) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      [
        'sync'
      , (value: unknown) => jest.fn(() => {
          jest.advanceTimersByTime(100)
          return value
        })
      ]
    , [
        'async'
      , (value: unknown) => jest.fn(() => {
          jest.advanceTimersByTime(20)

          return new Promise<unknown>(resolve => {
            jest.advanceTimersByTime(80)
            resolve(value)
          })
        })
      ]
    ])('expression: %s', (expressionType, createExpression) => {
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
          const result = logger[method](message, expression)

          expect(expression).toBeCalledTimes(1)
          switch (expressionType) {
            case 'sync': {
              expect(result).toBe(value)
              break
            }
            case 'async': {
              expect(isPromise(result)).toBe(true)
              expect(await result).toBe(value)
              break
            }
            default: throw new Error('Unknown expression type')
          }
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
          const result = logger[method](message, expression)

          expect(expression).toBeCalledTimes(1)
          switch (expressionType) {
            case 'sync': {
              expect(result).toBe(value)
              break
            }
            case 'async': {
              expect(isPromise(result)).toBe(true)
              expect(await result).toBe(value)
              break
            }
            default: throw new Error('Unknown expression type')
          }
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
          const result = logger[method](message, expression)

          expect(expression).toBeCalledTimes(1)
          switch (expressionType) {
            case 'sync': {
              expect(result).toBe(value)
              break
            }
            case 'async': {
              expect(isPromise(result)).toBe(true)
              expect(await result).toBe(value)
              break
            }
            default: throw new Error('Unknown expression type')
          }
          expect(transport.send).not.toBeCalled()
        })
      })
    })
  })

  describe.each([
    ['traceTimeFunction', Level.Trace, Level.Trace]
  , ['debugTimeFunction', Level.Debug, Level.Debug]
  , ['infoTimeFunction', Level.Info, Level.Info]
  , ['warnTimeFunction', Level.Warn, Level.Warn]
  , ['errorTimeFunction', Level.Error, Level.Error]
  , ['fatalTimeFunction', Level.Fatal, Level.Fatal]
  ])('%s', (method: string, methodLevel: Level, loggerLevel: Level) => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    describe.each([
      [
        'sync'
      , () => jest.fn((value: unknown) => {
          jest.advanceTimersByTime(100)
          return value
        })
      ]
    , [
        'async'
      , () => jest.fn((value: unknown) => {
          jest.advanceTimersByTime(20)

          return new Promise<unknown>(resolve => {
            jest.advanceTimersByTime(80)
            resolve(value)
          })
        })
      ]
    ])('fn: %s', (fnType, createFn) => {
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
          const newFn = logger[method](message, fn)
          const result = newFn(value)

          expect(fn).toBeCalledTimes(1)
          switch (fnType) {
            case 'sync': {
              expect(result).toBe(value)
              break
            }
            case 'async': {
              expect(isPromise(result)).toBe(true)
              expect(await result).toBe(value)
              break
            }
            default: throw new Error('Unknown expression type')
          }
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
          const newFn = logger[method](message, fn)
          const result = newFn(value)

          expect(fn).toBeCalledTimes(1)
          switch (fnType) {
            case 'sync': {
              expect(result).toBe(value)
              break
            }
            case 'async': {
              expect(isPromise(result)).toBe(true)
              expect(await result).toBe(value)
              break
            }
            default: throw new Error('Unknown expression type')
          }
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
          const newFn = logger[method](message, fn)
          const result = newFn(value)

          expect(fn).toBeCalledTimes(1)
          switch (fnType) {
            case 'sync': {
              expect(result).toBe(value)
              break
            }
            case 'async': {
              expect(isPromise(result)).toBe(true)
              expect(await result).toBe(value)
              break
            }
            default: throw new Error('Unknown expression type')
          }
          expect(transport.send).not.toBeCalled()
        })
      })
    })
  })
})
