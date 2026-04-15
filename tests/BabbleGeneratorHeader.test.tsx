import { beforeEach, describe, expect, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import { BabbleGeneratorHeader } from '../src/features/babble-generator/components/BabbleGeneratorHeader'
import { mockSystemThemePrefersDark, renderWithBabbleProvider } from './testUtils'

describe('BabbleGeneratorHeader', () => {
  beforeEach(() => {
    mockSystemThemePrefersDark(false)
  })

  test('renders title copy and the dark mode toggle', () => {
    renderWithBabbleProvider(<BabbleGeneratorHeader />)

    expect(screen.getByText('Star Trek Adventures 2e Technobabble Generator')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Babble Generator' })).toBeInTheDocument()
    expect(screen.getByText(/Generate a complete Trek-style technical fix/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Toggle dark mode' })).toBeInTheDocument()
  })
})
