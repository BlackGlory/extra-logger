import { Awaitable, go, isPromiseLike } from '@blackglory/prelude'

export function measureElapsedTime<T>(
  fn: () => Awaitable<T>
, callback: (elapsedTime: number) => void
): T | Promise<T> {
  const startTime = Date.now()
  const result = fn()
  if (isPromiseLike(result)) {
    const promise = result

    return go(async () => {
      const result = await promise
      const endTime = Date.now()
      callback(endTime - startTime)
      return result
    })
  } else {
    const endTime = Date.now()
    callback(endTime - startTime)
    return result
  }
}
