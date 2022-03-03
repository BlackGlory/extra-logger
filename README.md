# extra-logger
## Install
```sh
npm install --save extra-logger
# or
yarn add extra-logger
```

## API
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

interface ITransport {
  send(message: IMessage): void
}

interface IMessage {
  level: Level
  timestamp: number
  message: string
  namespace?: string
  elapsedTime?: number
}
```

### Logger
```ts
interface ILoggerOptions {
  level: Level
  transport: ITransport
  namespace?: string
}

class Logger {
  constructor(private options: ILoggerOptions)

  trace(message: string | Getter<string>, elapsedTime?: number): void
  info(message: string | Getter<string>, elapsedTime?: number): void
  debug(message: string | Getter<string>, elapsedTime?: number): void
  warn(message: string | Getter<string>, elapsedTime?: number): void
  error(message: string | Getter<string>, elapsedTime?: number): void
  fatal(message: string | Getter<string>, elapsedTime?: number): void

  traceTime<T>(message: string | Getter<string>, expression: () => T): T
  traceTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>

  infoTime<T>(message: string | Getter<string>, expression: () => T): T
  infoTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>

  debugTime<T>(message: string | Getter<string>, expression: () => T): T
  debugTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>

  warnTime<T>(message: string | Getter<string>, expression: () => T): T
  warnTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>

  errorTime<T>(message: string | Getter<string>, expression: () => T): T
  errorTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>

  fatalTime<T>(message: string | Getter<string>, expression: () => T): T
  fatalTime<T>(message: string | Getter<string>, expression: () => PromiseLike<T>): PromiseLike<T>
}
```

### TerminalTransport
```ts
export interface ITerminalTransportOptions {
  logMinimumDuration?: number
}

class TerminalTransport implements ITransport {
  constructor(private options: ITerminalTransportOptions)
}
```

### stringToLevel
```ts
function stringToLevel(text: string): Level
```
