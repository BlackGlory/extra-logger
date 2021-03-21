import { Level } from './level'

export type ITransport<T> = (log: T) => void

export interface ITransports<T> {
  [Level.Trace]: ITransport<T>
  [Level.Debug]: ITransport<T>
  [Level.Info]: ITransport<T>
  [Level.Warn]: ITransport<T>
  [Level.Error]: ITransport<T>
  [Level.Fatal]: ITransport<T>
}
