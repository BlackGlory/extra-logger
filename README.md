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
  trace: T
  debug: T
  info: T
  warn: T
  error: T
  fatal: T
}

interface ITransports<T extends ILog> {
  [Level.Trace]: ITransport<T['trace']>
  [Level.Debug]: ITransport<T['debug']>
  [Level.Info]: ITransport<T['info']>
  [Level.Warn]: ITransport<T['warn']>
  [Level.Error]: ITransport<T['error']>
  [Level.Fatal]: ITransport<T['fatal']>
}

interface ILogger<T extends ILog> {
  trace<U extends T['trace']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  debug<U extends T['debug']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  info<U extends T['info']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  warn<U extends T['warn']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  error<U extends T['error']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  fatal<U extends T['fatal']>(createLog: U | Getter<U>, transport?: ITransport<U>): void
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
      trace: TTrace
      debug: TDebug
      info: TInfo
      warn: TWarn
      error: TError
      fatal: TFatal
    }>>
): ILogger<{
  trace: TTrace
  debug: TDebug
  info: TInfo
  warn: TWarn
  error: TError
  fatal: TFatal
}>
```
