import { Level } from './level'
import { Getter } from 'hotypes'

export type ITransport<T> = (log: T) => void

export interface ILog<T = unknown> {
  [Level.Trace]: T
  [Level.Debug]: T
  [Level.Info]: T
  [Level.Warn]: T
  [Level.Error]: T
  [Level.Fatal]: T
}

export interface ITransports<T extends ILog> {
  [Level.Trace]: ITransport<T[Level.Trace]>
  [Level.Debug]: ITransport<T[Level.Debug]>
  [Level.Info]: ITransport<T[Level.Info]>
  [Level.Warn]: ITransport<T[Level.Warn]>
  [Level.Error]: ITransport<T[Level.Error]>
  [Level.Fatal]: ITransport<T[Level.Fatal]>
}

export interface ILogger<T extends Partial<ILog> = {}> {
  trace<U extends T[Level.Trace]>(createLog: U | Getter<U>): void
  trace<U extends T[Level.Trace], V>(collect: () => V, createLog: (params: V) => U): void

  debug<U extends T[Level.Debug]>(createLog: U | Getter<U>): void
  debug<U extends T[Level.Debug], V>(collect: () => V, createLog: (params: V) => U): void

  info<U extends T[Level.Info]>(createLog: U | Getter<U>): void
  info<U extends T[Level.Info], V>(collect: () => V, createLog: (params: V) => U): void

  warn<U extends T[Level.Warn]>(createLog: U | Getter<U>): void
  warn<U extends T[Level.Warn], V>(collect: () => V, createLog: (params: V) => U): void

  error<U extends T[Level.Error]>(createLog: U | Getter<U>): void
  error<U extends T[Level.Error], V>(collect: () => V, createLog: (params: V) => U): void

  fatal<U extends T[Level.Fatal]>(createLog: U | Getter<U>): void
  fatal<U extends T[Level.Fatal], V>(collect: () => V, createLog: (params: V) => U): void
}
