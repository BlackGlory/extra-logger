# extra-logger
The bare metal logger for experts.

## Install

```sh
npm install --save extra-logger
# or
yarn add extra-logger
```

## API

```ts
type ITransport<T> = (log: T) => void

interface ILog<T = unknown> {
  [Level.Trace]: T
  [Level.Debug]: T
  [Level.Info]: T
  [Level.Warn]: T
  [Level.Error]: T
  [Level.Fatal]: T
}

interface ITransports<T extends ILog> {
  [Level.Trace]: ITransport<T[Level.Trace]>
  [Level.Debug]: ITransport<T[Level.Debug]>
  [Level.Info]: ITransport<T[Level.Info]>
  [Level.Warn]: ITransport<T[Level.Warn]>
  [Level.Error]: ITransport<T[Level.Error]>
  [Level.Fatal]: ITransport<T[Level.Fatal]>
}

export interface ILogger<T extends Partial<ILog> = {}> {
  trace<U extends T[Level.Trace]>(log: U): void
  trace<U extends T[Level.Trace]>(createLog: Getter<U>): void
  trace<U extends T[Level.Trace], V>(params: V, createLog: (params: V) => U): void
  trace<U extends T[Level.Trace], V>(collect: () => V, createLog: (params: V) => U): void

  debug<U extends T[Level.Debug]>(log: U): void
  debug<U extends T[Level.Debug]>(createLog: Getter<U>): void
  debug<U extends T[Level.Debug], V>(params: V, createLog: (params: V) => U): void
  debug<U extends T[Level.Debug], V>(collect: () => V, createLog: (params: V) => U): void

  info<U extends T[Level.Info]>(log: U): void
  info<U extends T[Level.Info]>(createLog: Getter<U>): void
  info<U extends T[Level.Info], V>(params: V, createLog: (params: V) => U): void
  info<U extends T[Level.Info], V>(collect: () => V, createLog: (params: V) => U): void

  warn<U extends T[Level.Warn]>(log: U): void
  warn<U extends T[Level.Warn]>(createLog: Getter<U>): void
  warn<U extends T[Level.Warn], V>(params: V, createLog: (params: V) => U): void
  warn<U extends T[Level.Warn], V>(collect: () => V, createLog: (params: V) => U): void

  error<U extends T[Level.Error]>(log: U): void
  error<U extends T[Level.Error]>(createLog: Getter<U>): void
  error<U extends T[Level.Error], V>(params: V, createLog: (params: V) => U): void
  error<U extends T[Level.Error], V>(collect: () => V, createLog: (params: V) => U): void

  fatal<U extends T[Level.Fatal]>(log: U): void
  fatal<U extends T[Level.Fatal]>(createLog: Getter<U>): void
  fatal<U extends T[Level.Fatal], V>(params: V, createLog: (params: V) => U): void
  fatal<U extends T[Level.Fatal], V>(collect: () => V, createLog: (params: V) => U): void
}
```

### Level

```ts
enum Level {
  Trace
, Debug
, Info
, Warn
, Error
, Fatal
, None
}
```

### createLogger

```ts
function createLogger<TTrace, TDebug, TInfo, TWarn, TError, TFatal>(
  getLevel: Level | Getter<Level>
, defaultTransport?:
  | ITransport<TTrace | TDebug | TInfo | TWarn | TError | TFatal>
  | Partial<ITransports<{
      [Level.Trace]: TTrace
      [Level.Debug]: TDebug
      [Level.Info]: TInfo
      [Level.Warn]: TWarn
      [Level.Error]: TError
      [Level.Fatal]: TFatal
    }>>
): ILogger<{
  [Level.Trace]: TTrace
  [Level.Debug]: TDebug
  [Level.Info]: TInfo
  [Level.Warn]: TWarn
  [Level.Error]: TError
  [Level.Fatal]: TFatal
}>
```
