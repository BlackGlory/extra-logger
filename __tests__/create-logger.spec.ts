import { createLogger } from '@src/create-logger'
import { Level } from '@src/level'

describe('createLogger(getLevel: Level, defaultTransport: (log: T) => void)', () => {
  describe('trace(log: T): void', () => {
    describe('Level.Trace', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Trace, transport)

        const result = log.trace('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Debug', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Debug, transport)

        const result = log.trace('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('trace(createLog: Getter<T>): void', () => {
    describe('Level.Trace', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Trace, transport)

        const result = log.trace('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Debug', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Debug, transport)

        const result = log.trace('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('debug(log: T): void', () => {
    describe('Level.Debug', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Debug, transport)

        const result = log.debug('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Info', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Info, transport)

        const result = log.debug('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('debug(createLog: Getter<T>): void', () => {
    describe('Level.Debug', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Debug, transport)

        const result = log.debug('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Info', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Info, transport)

        const result = log.debug('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('info(log: T): void', () => {
    describe('Level.Info', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Info, transport)

        const result = log.info('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Warn', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Warn, transport)

        const result = log.info('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('info(createLog: Getter<T>): void', () => {
    describe('Level.Info', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Info, transport)

        const result = log.info('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Warn', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Warn, transport)

        const result = log.info('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('warn(log: T): void', () => {
    describe('Level.Warn', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Warn, transport)

        const result = log.warn('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Error', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Error, transport)

        const result = log.warn('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('warn(createLog: Getter<T>): void', () => {
    describe('Level.Warn', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Warn, transport)

        const result = log.warn('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Error', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Error, transport)

        const result = log.warn('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('error(log: T): void', () => {
    describe('Level.Error', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Error, transport)

        const result = log.error('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Fatal', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Fatal, transport)

        const result = log.error('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('error(createLog: Getter<T>): void', () => {
    describe('Level.Error', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Error, transport)

        const result = log.error('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.Fatal', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Fatal, transport)

        const result = log.error('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('fatal(log: T): void', () => {
    describe('Level.Fatal', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.Fatal, transport)

        const result = log.fatal('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.None', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(Level.None, transport)

        const result = log.fatal('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })

  describe('fatal(createLog: Getter<T>): void', () => {
    describe('Level.Fatal', () => {
      it('calls transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.Fatal, transport)

        const result = log.fatal('log')

        expect(result).toBeUndefined()
        expect(transport).toBeCalledWith('log')
      })
    })

    describe('Level.None', () => {
      it('does not call transport', () => {
        const transport = jest.fn()
        const log = createLogger(() => Level.None, transport)

        const result = log.fatal('log')

        expect(result).toBeUndefined()
        expect(transport).not.toBeCalled()
      })
    })
  })
})
