import { ITransports } from './types'
import { Level } from './level'

export const consoleTransports: ITransports<unknown> = {
  [Level.Trace]: console.trace
, [Level.Debug]: console.debug
, [Level.Info]: console.info
, [Level.Warn]: console.warn
, [Level.Error]: console.error
, [Level.Fatal]: console.error
}
