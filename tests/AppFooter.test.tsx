import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { AppFooter } from '../src/features/babble-generator/components/AppFooter'

describe('AppFooter', () => {
  test('renders version, creator, source, and attribution metadata', () => {
    render(<AppFooter />)

    expect(screen.getByText('Version 0.0.0')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'John Martinez' })).toHaveAttribute('href', 'https://johnmartinez.dev/')
    expect(screen.getByRole('link', { name: 'Geek icons created by Pixel perfect - Flaticon' })).toHaveAttribute(
      'href',
      'https://www.flaticon.com/free-icons/geek',
    )
    expect(screen.getByText(/Star Trek Adventures 2e/)).toBeInTheDocument()
    expect(screen.getByText(/unofficial, non-commercial fan-made tool/)).toBeInTheDocument()
  })
})
