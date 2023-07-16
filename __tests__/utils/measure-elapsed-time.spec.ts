import { measureElapsedTime } from '@utils/measure-elapsed-time.js'
import { jest } from '@jest/globals'
import { isPromise } from '@blackglory/prelude'

jest.useFakeTimers()

describe('measureElapsedTime', () => {
  test('sync', () => {
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

  test('async', async () => {
    const value = {}
    const fn = jest.fn(() => {
      jest.advanceTimersByTime(100)

      return new Promise<typeof value>(resolve => {
        jest.advanceTimersByTime(200)
        resolve(value)
      })
    })
    const callback = jest.fn()

    const promise = measureElapsedTime(fn, callback)
    const result = await promise

    expect(fn).toBeCalledTimes(1)
    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(300)
    expect(isPromise(promise)).toBe(true)
    expect(result).toBe(value)
  })
})
