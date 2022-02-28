import { Logger } from '@src/logger'
import { Level } from '@src/types'

describe('Logger', () => {
  describe('trace(message: string): void', () => {
    describe('Level.Trace', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Trace, transport })

        const result = log.trace('message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Trace
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Debug', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Debug, transport })

        const result = log.trace('message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('trace(message: Getter<string>): void', () => {
    describe('Level.Trace', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Trace, transport })

        const result = log.trace(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Trace
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Debug', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Debug, transport })

        const result = log.trace(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('debug(message: string): void', () => {
    describe('Level.Debug', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Debug, transport })

        const result = log.debug('message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Debug
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Info', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Info, transport })

        const result = log.debug('message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('debug(message: Getter<string>): void', () => {
    describe('Level.Debug', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Debug, transport })

        const result = log.debug(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Debug
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Info', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Info, transport })

        const result = log.debug(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('info(message: string): void', () => {
    describe('Level.Info', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Info, transport })

        const result = log.info('message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Info
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Warn', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Warn, transport })

        const result = log.info('message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('info(message: Getter<T>): void', () => {
    describe('Level.Info', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Info, transport })

        const result = log.info(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Info
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Warn', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Warn, transport })

        const result = log.info(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('warn(message: string): void', () => {
    describe('Level.Warn', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Warn, transport })

        const result = log.warn('message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Warn
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Error', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Error, transport })

        const result = log.warn('message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('warn(message: Getter<string>): void', () => {
    describe('Level.Warn', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Warn, transport })

        const result = log.warn(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Warn
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Error', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Error, transport })

        const result = log.warn(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('error(message: string): void', () => {
    describe('Level.Error', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Error, transport })

        const result = log.error('message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Error
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Fatal', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Fatal, transport })

        const result = log.error('message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('error(message: Getter<string>): void', () => {
    describe('Level.Error', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Error, transport })

        const result = log.error(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Error
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.Fatal', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Fatal, transport })

        const result = log.error(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('fatal(message: string): void', () => {
    describe('Level.Fatal', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Fatal, transport })

        const result = log.fatal('message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Fatal
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.None', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.None, transport })

        const result = log.fatal('message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })

  describe('fatal(message: Getter<string>): void', () => {
    describe('Level.Fatal', () => {
      it('calls transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.Fatal, transport })

        const result = log.fatal(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).toBeCalledWith({
          level: Level.Fatal
        , message: 'message'
        , namespace: undefined
        , timestamp: expect.any(Number)
        })
      })
    })

    describe('Level.None', () => {
      it('does not call transport', () => {
        const transport = { send: jest.fn() }
        const log = new Logger({ level: Level.None, transport })

        const result = log.fatal(() => 'message')

        expect(result).toBeUndefined()
        expect(transport.send).not.toBeCalled()
      })
    })
  })
})
