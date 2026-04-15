import { beforeEach, describe, expect, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ResultPanel } from '../src/features/babble-generator/components/ResultPanel'
import { ResultRollSelect } from '../src/features/babble-generator/components/ResultRollSelect'
import { mockD20Roll, mockSystemThemePrefersDark, renderWithBabbleProvider } from './testUtils'

describe('ResultRollSelect', () => {
  beforeEach(() => {
    mockD20Roll(0)
    mockSystemThemePrefersDark(false)
  })

  test('renders options for the requested column', () => {
    renderWithBabbleProvider(<ResultRollSelect column="descriptor" label="Descriptor" roll={1} />)

    expect(screen.getByLabelText('Select Descriptor')).toHaveValue('1')
    expect(screen.getByRole('option', { name: '1: multiphasic' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '20: cyclic' })).toBeInTheDocument()
  })

  test('selecting a value updates the corresponding result and phrase', async () => {
    const user = userEvent.setup()

    renderWithBabbleProvider(<ResultPanel />)

    const descriptorSelect = screen.getByLabelText('Select Descriptor') as HTMLSelectElement
    await user.selectOptions(descriptorSelect, '2')

    const descriptorBlock = descriptorSelect.closest('.roll-item')

    expect(descriptorSelect.value).toBe('2')
    expect(descriptorBlock).toHaveTextContent('Result: 2')
    expect(descriptorBlock).toHaveTextContent('auxiliary')
    expect(screen.getByText('(re)initialize auxiliary thermal gravitic discriminator')).toBeInTheDocument()
  })
})
