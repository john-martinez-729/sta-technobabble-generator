import { beforeEach, describe, expect, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GeneratorTypeToggle } from '../src/features/babble-generator/components/GeneratorTypeToggle'
import { ResultPanel } from '../src/features/babble-generator/components/ResultPanel'
import { mockD20Roll, mockSystemThemePrefersDark, renderWithBabbleProvider } from './testUtils'

describe('ResultPanel', () => {
  beforeEach(() => {
    mockD20Roll(0)
    mockSystemThemePrefersDark(false)
  })

  test('renders the techno phrase and instructions', () => {
    renderWithBabbleProvider(<ResultPanel />)

    expect(screen.getByText('Treknobabble Generator')).toBeInTheDocument()
    expect(screen.getByText(/TRAINED STARFLEET ENGINEER/)).toBeInTheDocument()
    expect(screen.getByText('(re)initialize multiphasic thermal gravitic discriminator')).toBeInTheDocument()
  })

  test('renders medical results as a structured collection', async () => {
    const user = userEvent.setup()

    renderWithBabbleProvider(
      <>
        <GeneratorTypeToggle />
        <ResultPanel />
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Medical' }))

    expect(screen.getByText('Medical-Babble Generator')).toBeInTheDocument()
    expect(screen.getByText(/MEDICAL CONDITIONS/)).toBeInTheDocument()
    expect(screen.getAllByText('Illness/Injury').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Genetic unspooling').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Exposure to trillithium isotope').length).toBeGreaterThan(1)
    expect(screen.queryByText('Genetic unspooling Exposure to trillithium isotope neural caliper Mind-meld')).not.toBeInTheDocument()
  })

  test('generate button rerolls every column for the active table', async () => {
    const user = userEvent.setup()
    const randomSpy = mockD20Roll(0)

    renderWithBabbleProvider(<ResultPanel />)

    randomSpy.mockReturnValue(0.999)
    await user.click(screen.getByRole('button', { name: 'Generate Babble' }))

    expect(screen.getByText('(de/re)construct cyclic tetryon beam emitter')).toBeInTheDocument()
    expect(screen.getAllByText('Result: 20')).toHaveLength(5)
  })
})
