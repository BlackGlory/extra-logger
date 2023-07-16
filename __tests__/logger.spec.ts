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
  ])('%s', (method: string, methodLevel: Level, loggerLevel: Level) => {
    describe.each([
      ['getter', 'message']
    , ['value', () => 'message']
    ])('(%s)', (_, message) => {
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
      ['getter', 'message']
    , ['value', () => 'message']
    ])('(%s)', (_, message) => {
      test(`level < ${Level[methodLevel]}`, () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel - 1, transport })
        const obj = {}
        const expression = jest.fn(() => {
          jest.advanceTimersByTime(100)
          return obj
        })

        // @ts-ignore
        const result = logger[method](message, expression)

        expect(result).toBe(obj)
        expect(expression).toBeCalledTimes(1)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level = ${Level[methodLevel]}`, () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel, transport })
        const obj = {}
        const expression = jest.fn(() => {
          jest.advanceTimersByTime(100)
          return obj
        })

        // @ts-ignore
        const result = logger[method](message, expression)

        expect(result).toBe(obj)
        expect(expression).toBeCalledTimes(1)
        expect(transport.send).toBeCalledWith({
          level: methodLevel
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        , elapsedTime: 100
        })
      })

      test(`level > ${Level[methodLevel]}`, () => {
        const transport = { send: jest.fn() }
        const logger = new Logger({ level: loggerLevel + 1, transport })
        const obj = {}
        const expression = jest.fn(() => {
          jest.advanceTimersByTime(100)
          return obj
        })

        // @ts-ignore
        const result = logger[method](message, expression)

        expect(result).toBe(obj)
        expect(expression).toBeCalledTimes(1)
        expect(transport.send).not.toBeCalled()
      })
    })
  })
})
