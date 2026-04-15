import { useContext } from 'react'
import { BabbleGeneratorContext } from '../context/BabbleGeneratorContextValue'

export function useBabbleGenerator() {
  const context = useContext(BabbleGeneratorContext)

  if (!context) {
    throw new Error('useBabbleGenerator must be used within BabbleGeneratorProvider.')
  }

  return context
}
