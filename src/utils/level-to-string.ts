import { Level } from '@src/level'

export function levelToString(level: Level): string {
  switch (level) {
    case Level.Trace: return 'TRACE'
    case Level.Debug: return 'DEBUG'
    case Level.Info: return 'INFO'
    case Level.Warn: return 'WARN'
    case Level.Error: return 'ERROR'
    case Level.Fatal: return 'FATAL'
    default: return 'NONE'
  }
}
