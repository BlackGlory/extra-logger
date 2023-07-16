import { TerminalTransport } from '@transports/terminal-transport.js'
import { pass } from '@blackglory/prelude'
import { IMessage, Level } from '@src/types.js'
import { jest } from '@jest/globals'
import chalk from 'chalk'

const logSpy = jest.spyOn(console, 'log').mockImplementation(pass)

afterEach(() => logSpy.mockClear())

describe('TerminalTransport', () => {
  describe('send', () => {
    test('level', () => {
      const timestamp = 1689484883128 
      const message1 = createMessage(Level.Info)
      const message2 = createMessage(Level.Debug)
      const message3 = createMessage(Level.Warn)
      const message4 = createMessage(Level.Trace)
      const message5 = createMessage(Level.Error)
      const message6 = createMessage(Level.Fatal)
      const message7 = createMessage(Level.None)
      const transport = new TerminalTransport()

      transport.send(message1)
      transport.send(message2)
      transport.send(message3)
      transport.send(message4)
      transport.send(message5)
      transport.send(message6)
      transport.send(message7)

      expect(logSpy).toBeCalledTimes(7)
      expect(logSpy).nthCalledWith(1, `[INFO][${formatDate(timestamp)}] #1 message`)
      expect(logSpy).nthCalledWith(2, `[DEBUG][${formatDate(timestamp)}] #2 message`)
      expect(logSpy).nthCalledWith(3, `[WARN][${formatDate(timestamp)}] #3 message`)
      expect(logSpy).nthCalledWith(4, `[TRACE][${formatDate(timestamp)}] #4 message`)
      expect(logSpy).nthCalledWith(5, `[ERROR][${formatDate(timestamp)}] #5 message`)
      expect(logSpy).nthCalledWith(6, `[FATAL][${formatDate(timestamp)}] #6 message`)
      expect(logSpy).nthCalledWith(7, `[NONE][${formatDate(timestamp)}] #7 message`)

      function createMessage(level: Level): IMessage {
        return {
          level
        , message: 'message'
        , timestamp
        }
      }
    })

    test('elapsedTime', () => {
      const timestamp = 1689484883128
      const transport = new TerminalTransport()
      const message1 = createMessage(100)
      const message2 = createMessage(300)
      const message3 = createMessage(301)

      transport.send(message1)
      transport.send(message2)
      transport.send(message3)

      expect(logSpy).toBeCalledTimes(3)
      expect(logSpy).nthCalledWith(1, `[INFO][${formatDate(timestamp)}] #1 message ${chalk.green('100ms')}`)
      expect(logSpy).nthCalledWith(2, `[INFO][${formatDate(timestamp)}] #2 message ${chalk.yellow('300ms')}`)
      expect(logSpy).nthCalledWith(3, `[INFO][${formatDate(timestamp)}] #3 message ${chalk.red('301ms')}`)

      function createMessage(elapsedTime: number): IMessage {
        return {
          level: Level.Info
        , message: 'message'
        , timestamp
        , elapsedTime
        }
      }
    })

    test('with namespace', () => {
      const timestamp = 1689484883128
      const message: IMessage = {
        level: Level.Info
      , message: 'message'
      , timestamp
      , namespace: 'namespace'
      }
      const transport = new TerminalTransport()

      transport.send(message)

      expect(logSpy).toBeCalledTimes(1)
      expect(logSpy).toBeCalledWith(`[INFO][${formatDate(timestamp)}] #1 ${chalk.cyan('namespace')} message`)
    })

    describe('with logMinimalDuration', () => {
      test('without elapsedTime', () => {
        const timestamp = 1689484883128
        const message: IMessage = {
          level: Level.Info
        , message: 'message'
        , timestamp
        }
        const transport = new TerminalTransport({
          logMinimumDuration: 100
        })

        transport.send(message)

        expect(logSpy).toBeCalledTimes(1)
        expect(logSpy).toBeCalledWith(`[INFO][${formatDate(timestamp)}] #1 message`)
      })

      test('elapsedTime > logMinimalDuration', () => {
        const timestamp = 1689484883128
        const message: IMessage = {
          level: Level.Info
        , message: 'message'
        , timestamp
        , elapsedTime: 101
        }
        const transport = new TerminalTransport({
          logMinimumDuration: 100
        })

        transport.send(message)

        expect(logSpy).toBeCalledTimes(1)
        expect(logSpy).toBeCalledWith(`[INFO][${formatDate(timestamp)}] #1 message ${chalk.yellow('101ms')}`)
      })

      test('elapsedTime = logMinimalDuration', () => {
        const timestamp = 1689484883128
        const message: IMessage = {
          level: Level.Info
        , message: 'message'
        , timestamp
        , elapsedTime: 100
        }
        const transport = new TerminalTransport({
          logMinimumDuration: 100
        })

        transport.send(message)

        expect(logSpy).toBeCalledTimes(1)
        expect(logSpy).toBeCalledWith(`[INFO][${formatDate(timestamp)}] #1 message ${chalk.green('100ms')}`)
      })

      test('elapsedTime < logMinimalDuration', () => {
        const timestamp = 1689484883128
        const message: IMessage = {
          level: Level.Info
        , message: 'message'
        , timestamp
        , elapsedTime: 99
        }
        const transport = new TerminalTransport({
          logMinimumDuration: 100
        })

        transport.send(message)

        expect(logSpy).not.toBeCalled()
      })
    })
  })
})

function formatDate(timestamp: number): string {
  return new Date(timestamp).toISOString()
}
