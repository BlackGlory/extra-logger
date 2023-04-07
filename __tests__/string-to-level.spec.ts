import { stringToLevel } from '@src/string-to-level.js'
import { Level } from '@src/types.js'

test('stringToLevel', () => {
  expect(stringToLevel('trace')).toBe(Level.Trace)
  expect(stringToLevel('Trace')).toBe(Level.Trace)
  expect(stringToLevel('TRACE')).toBe(Level.Trace)

  expect(stringToLevel('debug')).toBe(Level.Debug)
  expect(stringToLevel('Debug')).toBe(Level.Debug)
  expect(stringToLevel('DEBUG')).toBe(Level.Debug)

  expect(stringToLevel('info')).toBe(Level.Info)
  expect(stringToLevel('Info')).toBe(Level.Info)
  expect(stringToLevel('INFO')).toBe(Level.Info)

  expect(stringToLevel('warn')).toBe(Level.Warn)
  expect(stringToLevel('Warn')).toBe(Level.Warn)
  expect(stringToLevel('WARN')).toBe(Level.Warn)

  expect(stringToLevel('error')).toBe(Level.Error)
  expect(stringToLevel('Error')).toBe(Level.Error)
  expect(stringToLevel('ERROR')).toBe(Level.Error)

  expect(stringToLevel('fatal')).toBe(Level.Fatal)
  expect(stringToLevel('Fatal')).toBe(Level.Fatal)
  expect(stringToLevel('FATAL')).toBe(Level.Fatal)

  expect(stringToLevel('none')).toBe(Level.None)
  expect(stringToLevel('None')).toBe(Level.None)
  expect(stringToLevel('NONE')).toBe(Level.None)

  expect(stringToLevel('')).toBe(Level.None)
  expect(stringToLevel('', Level.None)).toBe(Level.None)
  expect(stringToLevel('', Level.Info)).toBe(Level.Info)
})
