import { beforeEach, describe, expect, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RerollButton } from '../src/features/babble-generator/components/RerollButton'
import { ResultPanel } from '../src/features/babble-generator/components/ResultPanel'
import { mockD20Roll, mockSystemThemePrefersDark, renderWithBabbleProvider } from './testUtils'

describe('RerollButton', () => {
  beforeEach(() => {
    mockD20Roll(0)
    mockSystemThemePrefersDark(false)
  })

  test('renders accessible reroll control', () => {
    renderWithBabbleProvider(<RerollButton column="action" label="Action" />)

    expect(screen.getByRole('button', { name: 'Reroll Action' })).toBeInTheDocument()
  })

  test('rerolls only the requested column through context', async () => {
    const user = userEvent.setup()
    const randomSpy = mockD20Roll(0)

    renderWithBabbleProvider(<ResultPanel />)

    randomSpy.mockReturnValue(0.999)
    await user.click(screen.getByRole('button', { name: 'Reroll Action' }))

    const actionSelect = screen.getByLabelText('Select Action') as HTMLSelectElement
    const actionBlock = actionSelect.closest('.roll-item')
    const descriptorSelect = screen.getByLabelText('Select Descriptor') as HTMLSelectElement
    const descriptorBlock = descriptorSelect.closest('.roll-item')

    expect(actionSelect.value).toBe('20')
    expect(actionBlock).toHaveTextContent('Result: 20')
    expect(actionBlock).toHaveTextContent('(de/re)construct')
    expect(descriptorBlock).toHaveTextContent('Result: 1')
    expect(screen.getByText('(de/re)construct multiphasic thermal gravitic discriminator')).toBeInTheDocument()
  })
})
