import { beforeEach, describe, expect, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import type { RollResult } from '../src/features/babble-generator/logic/generator'
import { ResultBlock } from '../src/features/babble-generator/components/ResultBlock'
import { mockSystemThemePrefersDark, renderWithBabbleProvider } from './testUtils'

const actionRoll: RollResult<string> = {
  column: 'action',
  label: 'Action',
  roll: 1,
  value: '(re)initialize',
}

describe('ResultBlock', () => {
  beforeEach(() => {
    mockSystemThemePrefersDark(false)
  })

  test('renders a result value, reroll button, and dropdown', () => {
    renderWithBabbleProvider(<ResultBlock rollResult={actionRoll} />)

    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Result: 1')).toBeInTheDocument()
    expect(screen.getByText('(re)initialize')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reroll Action' })).toBeInTheDocument()
    expect(screen.getByLabelText('Select Action')).toHaveValue('1')
  })
})
