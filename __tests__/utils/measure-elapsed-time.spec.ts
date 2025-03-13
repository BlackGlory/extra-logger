import { measureElapsedTime, measureElapsedTimeAsync } from '@utils/measure-elapsed-time.js'
import { jest } from '@jest/globals'

jest.useFakeTimers()

test('measureElapsedTime', () => {
  const value = {}
  const fn = jest.fn(() => {
    jest.advanceTimersByTime(100)
    return value
  })
  const callback = jest.fn()

  const result = measureElapsedTime(fn, callback)

  expect(fn).toBeCalledTimes(1)
  expect(callback).toBeCalledTimes(1)
  expect(callback).toBeCalledWith(100)
  expect(result).toBe(value)
})

test('measureElapsedTimeAsync', async () => {
  const value = {}
  const fn = jest.fn(() => {
    jest.advanceTimersByTime(100)

    return new Promise<typeof value>(resolve => {
      jest.advanceTimersByTime(200)
      resolve(value)
    })
  })
  const callback = jest.fn(async () => {})

  const result = await measureElapsedTimeAsync(fn, callback)

  expect(fn).toBeCalledTimes(1)
  expect(callback).toBeCalledTimes(1)
  expect(callback).toBeCalledWith(300)
  expect(result).toBe(value)
})
