import { beforeEach, describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DarkModeToggle } from '../src/features/babble-generator/components/DarkModeToggle'
import { BabbleGenerator } from '../src/features/babble-generator/BabbleGenerator'
import { mockD20Roll, mockSystemThemePrefersDark, renderWithBabbleProvider } from './testUtils'

describe('DarkModeToggle', () => {
  beforeEach(() => {
    mockSystemThemePrefersDark(false)
  })

  test('toggles and persists dark mode preference', async () => {
    const user = userEvent.setup()

    renderWithBabbleProvider(<DarkModeToggle />)

    const darkModeButton = screen.getByRole('button', { name: 'Toggle dark mode' })

    expect(darkModeButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(darkModeButton)

    expect(darkModeButton).toHaveAttribute('aria-pressed', 'true')
    expect(window.localStorage.getItem('babble-generator-theme')).toBe('dark')

    await user.click(darkModeButton)

    expect(darkModeButton).toHaveAttribute('aria-pressed', 'false')
    expect(window.localStorage.getItem('babble-generator-theme')).toBe('light')
  })

  test('uses saved dark mode preference on return visits', () => {
    window.localStorage.setItem('babble-generator-theme', 'dark')

    renderWithBabbleProvider(<DarkModeToggle />)

    expect(screen.getByRole('button', { name: 'Toggle dark mode' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('falls back to system dark mode preference without a saved preference', () => {
    mockSystemThemePrefersDark(true)

    renderWithBabbleProvider(<DarkModeToggle />)

    expect(screen.getByRole('button', { name: 'Toggle dark mode' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('applies the dark theme class to the page body when used in the app shell', async () => {
    const user = userEvent.setup()
    mockD20Roll(0)

    render(<BabbleGenerator />)

    const darkModeButton = screen.getByRole('button', { name: 'Toggle dark mode' })

    expect(document.body).not.toHaveClass('theme-dark')

    await user.click(darkModeButton)

    expect(document.body).toHaveClass('theme-dark')
  })
})
