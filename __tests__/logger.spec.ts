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

    const obj = {}
    describe.each([
      [
        'sync'
      , () => jest.fn(() => {
          jest.advanceTimersByTime(100)
          return obj
        })
      ]
    , [
        'async'
      , () => jest.fn(() => {
          jest.advanceTimersByTime(20)
          return new Promise<typeof obj>(resolve => {
            jest.advanceTimersByTime(80)
            resolve(obj)
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
          const expression = createExpression()

          // @ts-ignore
          const result = logger[method](message, expression)

          switch (expressionType) {
            case 'sync': {
              expect(result).toBe(obj)
              break
            }
            case 'async': {
              expect(isPromise(result)).toBe(true)
              expect(await result).toBe(obj)
              break
            }
            default: throw new Error('Unknown expression type')
          }
          expect(expression).toBeCalledTimes(1)
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
          const expression = createExpression()

          // @ts-ignore
          const result = logger[method](message, expression)

          switch (expressionType) {
            case 'sync': {
              expect(result).toBe(obj)
              break
            }
            case 'async': {
              expect(isPromise(result)).toBe(true)
              expect(await result).toBe(obj)
              break
            }
            default: throw new Error('Unknown expression type')
          }
          expect(expression).toBeCalledTimes(1)
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
          const expression = createExpression()

          // @ts-ignore
          const result = logger[method](message, expression)

          switch (expressionType) {
            case 'sync': {
              expect(result).toBe(obj)
              break
            }
            case 'async': {
              expect(isPromise(result)).toBe(true)
              expect(await result).toBe(obj)
              break
            }
            default: throw new Error('Unknown expression type')
          }
          expect(expression).toBeCalledTimes(1)
          expect(transport.send).not.toBeCalled()
        })
      })
    })
  })
})
