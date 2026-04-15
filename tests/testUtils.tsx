import { afterEach, jest } from '@jest/globals'
import { cleanup, render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { BabbleGeneratorProvider } from '../src/features/babble-generator/context/BabbleGeneratorContext'

afterEach(() => {
  cleanup()
  document.body.className = ''
  window.localStorage.clear()
  jest.restoreAllMocks()
})

export function mockSystemThemePrefersDark(prefersDark: boolean) {
  const matchMediaMock: typeof window.matchMedia = (query) => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(),
    dispatchEvent: jest.fn(() => true),
    matches: prefersDark,
    media: query,
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(),
  })

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: matchMediaMock,
  })
}

export function mockD20Roll(rollRandomValue: number) {
  return jest.spyOn(Math, 'random').mockReturnValue(rollRandomValue)
}

export function renderWithBabbleProvider(ui: ReactElement) {
  return render(<BabbleGeneratorProvider>{ui}</BabbleGeneratorProvider>)
}
