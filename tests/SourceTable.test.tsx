import { beforeEach, describe, expect, test } from '@jest/globals'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GeneratorTypeToggle } from '../src/features/babble-generator/components/GeneratorTypeToggle'
import { SourceTable } from '../src/features/babble-generator/components/SourceTable'
import { mockD20Roll, mockSystemThemePrefersDark, renderWithBabbleProvider } from './testUtils'

describe('SourceTable', () => {
  beforeEach(() => {
    mockD20Roll(0)
    mockSystemThemePrefersDark(false)
  })

  test('renders the active techno source table', () => {
    renderWithBabbleProvider(<SourceTable />)

    expect(screen.getByRole('heading', { name: 'Treknobabble Generator' })).toBeInTheDocument()
    expect(within(screen.getByRole('table')).getByText('(de/re)construct')).toBeInTheDocument()
  })

  test('updates when the active generator changes', async () => {
    const user = userEvent.setup()

    renderWithBabbleProvider(
      <>
        <GeneratorTypeToggle />
        <SourceTable />
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Medical' }))

    expect(screen.getByRole('heading', { name: 'Medical-Babble Generator' })).toBeInTheDocument()
    expect(within(screen.getByRole('table')).getByText('Loss of emotional control')).toBeInTheDocument()
  })
})
