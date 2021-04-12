import { ITransports, ILog } from './types'
import { Level } from './level'

export const consoleTransports: ITransports<ILog<unknown>> = {
  [Level.Trace]: console.trace
, [Level.Debug]: console.debug
, [Level.Info]: console.info
, [Level.Warn]: console.warn
, [Level.Error]: console.error
, [Level.Fatal]: console.error
}
