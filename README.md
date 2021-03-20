# extra-logger
The bare metal logger for experts.

## Install

```sh
npm install --save extra-logger
# or
yarn add extra-logger
```

## API

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
, defaultTransport: (log: T) => void = console.log
): {
  trace(createLog: T | Getter<T>, transport: (log: T) => void = defaultTransport): void
  debug(createLog: T | Getter<T>, transport: (log: T) => void = defaultTransport): void
  info(createLog: T | Getter<T>, transport: (log: T) => void = defaultTransport): void
  warn(createLog: T | Getter<T>, transport: (log: T) => void = defaultTransport): void
  error(createLog: T | Getter<T>, transport: (log: T) => void = defaultTransport): void
  fatal(createLog: T | Getter<T>, transport: (log: T) => void = defaultTransport): void
}
```
