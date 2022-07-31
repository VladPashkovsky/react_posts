import { useMemo } from 'react'

export const usePageArray = (totalPages) => {
  let result = []
  const pageArray = useMemo(() => {
    for (let i = 0; i < totalPages; i++) {
      result.push(i + 1)
    }
  }, [result])
  return pageArray
}