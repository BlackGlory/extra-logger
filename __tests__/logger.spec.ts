import { Logger } from '@src/logger.js'
import { Level } from '@src/types.js'
import { jest } from '@jest/globals'

describe('Logger', () => {
  describe.each([
    ['getter', 'message']
  , ['value', () => 'message']
  ])('trace(%s)', (_, message) => {
    test('level = trace', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Trace, transport })

      const result = log.trace(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Trace
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level > trace', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Debug, transport })

      const result = log.trace(message)

      expect(result).toBeUndefined()
      expect(transport.send).not.toBeCalled()
    })
  })

  describe.each([
    ['getter', 'message']
  , ['value', () => 'message']
  ])('debug(%s)', (_, message) => {
    test('level < debug', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Trace, transport })

      const result = log.debug(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Debug
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level = debug', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Debug, transport })

      const result = log.debug(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Debug
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level > debug', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Info, transport })

      const result = log.debug(message)

      expect(result).toBeUndefined()
      expect(transport.send).not.toBeCalled()
    })
  })

  describe.each([
    ['getter', 'message']
  , ['value', () => 'message']
  ])('info(%s)', (_, message) => {
    test('level < info', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Debug, transport })

      const result = log.info(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Info
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level = info', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Info, transport })

      const result = log.info(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Info
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level > info', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Warn, transport })

      const result = log.info(message)

      expect(result).toBeUndefined()
      expect(transport.send).not.toBeCalled()
    })
  })

  describe.each([
    ['getter', 'message']
  , ['value', () => 'message']
  ])('warn(%s)', (_, message) => {
    test('level < warn', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Info, transport })

      const result = log.warn(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Warn
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level = warn', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Warn, transport })

      const result = log.warn(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Warn
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level > error', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Error, transport })

      const result = log.warn(message)

      expect(result).toBeUndefined()
      expect(transport.send).not.toBeCalled()
    })
  })

  describe.each([
    ['getter', 'message']
  , ['value', () => 'message']
  ])('error(%s)', (_, message) => {
    test('level < error', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Warn, transport })

      const result = log.error(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Error
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level = error', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Error, transport })

      const result = log.error(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Error
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level > error', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Fatal, transport })

      const result = log.error(message)

      expect(result).toBeUndefined()
      expect(transport.send).not.toBeCalled()
    })
  })

  describe.each([
    ['getter', 'message']
  , ['value', () => 'message']
  ])('fatal(%s)', (_, message) => {
    test('level < fatal', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Error, transport })

      const result = log.fatal(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Fatal
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level = fatal', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.Fatal, transport })

      const result = log.fatal(message)

      expect(result).toBeUndefined()
      expect(transport.send).toBeCalledWith({
        level: Level.Fatal
      , message: 'message'
      , namespace: undefined
      , timestamp: expect.any(Number)
      })
    })

    test('level > fatal', () => {
      const transport = { send: jest.fn() }
      const log = new Logger({ level: Level.None, transport })

      const result = log.fatal(message)

      expect(result).toBeUndefined()
      expect(transport.send).not.toBeCalled()
    })
  })
})
