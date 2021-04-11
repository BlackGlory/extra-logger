import { Level } from './level'
import { Getter } from 'hotypes'

export type ITransport<T> = (log: T) => void

export interface ITransports<T> {
  [Level.Trace]: ITransport<T>
  [Level.Debug]: ITransport<T>
  [Level.Info]: ITransport<T>
  [Level.Warn]: ITransport<T>
  [Level.Error]: ITransport<T>
  [Level.Fatal]: ITransport<T>
}

export interface ILogger<T> {
  trace<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  debug<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  info<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  warn<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  error<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  fatal<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
}
