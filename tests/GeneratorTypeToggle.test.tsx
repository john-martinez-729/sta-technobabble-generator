import { beforeEach, describe, expect, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GeneratorTypeToggle } from '../src/features/babble-generator/components/GeneratorTypeToggle'
import { ResultPanel } from '../src/features/babble-generator/components/ResultPanel'
import { mockD20Roll, mockSystemThemePrefersDark, renderWithBabbleProvider } from './testUtils'

describe('GeneratorTypeToggle', () => {
  beforeEach(() => {
    mockD20Roll(0)
    mockSystemThemePrefersDark(false)
  })

  test('renders techno selected by default', () => {
    renderWithBabbleProvider(<GeneratorTypeToggle />)

    expect(screen.getByRole('button', { name: 'Techno' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Medical' })).toHaveAttribute('aria-pressed', 'false')
  })

  test('switches generator type through context', async () => {
    const user = userEvent.setup()

    renderWithBabbleProvider(
      <>
        <GeneratorTypeToggle />
        <ResultPanel />
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Medical' }))

    expect(screen.getByRole('button', { name: 'Techno' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Medical' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/MEDICAL CONDITIONS/)).toBeInTheDocument()
  })
})
