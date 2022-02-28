export const enum Level {
  Trace = 1
, Debug = 2
, Info = 3
, Warn = 4
, Error = 5
, Fatal = 6
, None = 7
}

export interface ITransport {
  send(message: IMessage): void
}

export interface IMessage {
  level: Level
  timestamp: number
  message: string
  namespace?: string
  elapsedTime?: number
}
