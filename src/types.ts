import { Level } from './level'
import { Getter } from 'hotypes'

export type ITransport<T> = (log: T) => void

export interface ILog<T = unknown> {
  trace: T
  debug: T
  info: T
  warn: T
  error: T
  fatal: T
}

export interface ITransports<T extends ILog> {
  [Level.Trace]: ITransport<T['trace']>
  [Level.Debug]: ITransport<T['debug']>
  [Level.Info]: ITransport<T['info']>
  [Level.Warn]: ITransport<T['warn']>
  [Level.Error]: ITransport<T['error']>
  [Level.Fatal]: ITransport<T['fatal']>
}

export interface ILogger<T extends Partial<ILog>> {
  trace<U extends T['trace']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  debug<U extends T['debug']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  info<U extends T['info']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  warn<U extends T['warn']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  error<U extends T['error']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  fatal<U extends T['fatal']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
}
