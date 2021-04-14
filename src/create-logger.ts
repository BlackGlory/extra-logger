import { Level } from './level'
import { ITransport, ITransports, ILogger } from './types'
import { Getter } from 'hotypes'
import { Logger } from './logger'

export function createLogger<TTrace, TDebug, TInfo, TWarn, TError, TFatal>(
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
  return new Logger<{
    [Level.Trace]: TTrace
    [Level.Debug]: TDebug
    [Level.Info]: TInfo
    [Level.Warn]: TWarn
    [Level.Error]: TError
    [Level.Fatal]: TFatal
  }>(getLevel, defaultTransport)
}
