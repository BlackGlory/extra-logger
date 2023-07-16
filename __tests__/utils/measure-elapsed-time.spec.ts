import { measureElapsedTime } from '@utils/measure-elapsed-time.js'
import { jest } from '@jest/globals'
import { isPromise } from '@blackglory/prelude'

jest.useFakeTimers()

describe('measureElapsedTime', () => {
  test('sync', () => {
    const obj = {}
    const fn = jest.fn(() => {
      jest.advanceTimersByTime(100)
      return obj
    })
    const callback = jest.fn()

    const result = measureElapsedTime(fn, callback)

    expect(fn).toBeCalledTimes(1)
    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(100)
    expect(result).toBe(obj)
  })

  test('async', async () => {
    const obj = {}
    const fn = jest.fn(() => {
      jest.advanceTimersByTime(100)

      return new Promise<typeof obj>(resolve => {
        jest.advanceTimersByTime(200)
        resolve(obj)
      })
    })
    const callback = jest.fn()

    const promise = measureElapsedTime(fn, callback)
    const result = await promise

    expect(fn).toBeCalledTimes(1)
    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(300)
    expect(isPromise(promise)).toBe(true)
    expect(result).toBe(obj)
  })
})
