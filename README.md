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

interface ILogger<T extends Partial<ILog> = {}> {
  trace<U extends T[Level.Trace]>(createLog: U | Getter<U>): void
  debug<U extends T[Level.Debug]>(createLog: U | Getter<U>): void
  info<U extends T[Level.Info]>(createLog: U | Getter<U>): void
  warn<U extends T[Level.Warn]>(createLog: U | Getter<U>): void
  error<U extends T[Level.Error]>(createLog: U | Getter<U>): void
  fatal<U extends T[Level.Fatal]>(createLog: U | Getter<U>): void
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
}> {
```
