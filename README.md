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
interface ILogger<T> {
  trace<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  debug<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  info<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  warn<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  error<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
  fatal<U extends T>(createLog: U | Getter<U>, transport?: ITransport<U>): void
}

interface ITransports<T> {
  [Level.Trace]: ITransport<T>
  [Level.Debug]: ITransport<T>
  [Level.Info]: ITransport<T>
  [Level.Warn]: ITransport<T>
  [Level.Error]: ITransport<T>
  [Level.Fatal]: ITransport<T>
}

type ITransport<T> = (log: T) => void
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
function createLogger<T>(
  getLevel: Level | Getter<Level>
, defaultTransport?: ITransport<T> | Partial<ITransports<T>>
): ILogger<T>
```
