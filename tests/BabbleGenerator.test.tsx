import { beforeEach, describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { BabbleGenerator } from '../src/features/babble-generator/BabbleGenerator'
import { mockD20Roll, mockSystemThemePrefersDark } from './testUtils'

describe('BabbleGenerator', () => {
  beforeEach(() => {
    mockSystemThemePrefersDark(false)
  })

  test('renders the app shell with the default techno generator', () => {
    mockD20Roll(0)

    render(<BabbleGenerator />)

    expect(screen.getByRole('heading', { name: 'Babble Generator' })).toBeInTheDocument()
    expect(screen.getByText('(re)initialize multiphasic thermal gravitic discriminator')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Techno' })).toHaveAttribute('aria-pressed', 'true')
  })
})
