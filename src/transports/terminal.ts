import { Level } from '@src/types'
import { ITransport, IMessage } from '@src/types'
import * as chalk from 'chalk'
import { isUndefined, isntUndefined } from '@blackglory/types'

export interface ITerminalTransportOptions {
  /**
   * 对于记录执行耗时的日志, 仅打印高于此值的日志
   */
  logMinimumDuration?: number
}

export class TerminalTransport implements ITransport {
  private id: number = 0

  constructor(private options: ITerminalTransportOptions) {}

  send(message: IMessage) {
    if (isUndefined(message.elapsedTime) || isUndefined(this.options.logMinimumDuration)) {
      console.log(this.messageToString(message))
    } else {
      if (message.elapsedTime >= this.options.logMinimumDuration) {
        console.log(this.messageToString(message))
      }
    }
  }

  private messageToString(message: IMessage) {
    let result: string =
      `[${levelToString(message.level)}]`
    + `[${formatDate(message.timestamp)}]`
    + ` #${this.createId()}`

    if (isntUndefined(message.namespace)) {
      result += ` ${formatNamespace(message.namespace)}`
    }

    result += ` ${message}`

    if (isntUndefined(message.elapsedTime)) {
      result += ` ${formatElapsedTime(message.elapsedTime)}`
    }
    
    return result
  }

  private createId(): number {
    return ++this.id
  }
}

function levelToString(level: Level): string {
  switch (level) {
    case Level.Info: return 'INFO'
    case Level.Debug: return 'DEBUG'
    case Level.Warn: return 'WARN'
    case Level.Trace: return 'TRACE'
    case Level.Error: return 'ERROR'
    case Level.Fatal: return 'FATAL'
    default: return 'NONE'
  }
}

function formatNamespace(namespace: string): string {
  return chalk.cyan(namespace)
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString()
}

function formatElapsedTime(elapsed: number): string {
  if (elapsed <= 100) return chalk.green`${elapsed}ms`
  if (elapsed <= 300) return chalk.yellow`${elapsed}ms`
  return chalk.red`${elapsed}ms`
}
