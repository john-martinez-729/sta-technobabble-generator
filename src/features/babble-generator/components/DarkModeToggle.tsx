import { useBabbleGenerator } from '../hooks/useBabbleGenerator'

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useBabbleGenerator()

  return (
    <button
      className="dark-mode-toggle"
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed={isDarkMode}
      onClick={toggleDarkMode}
    >
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>
      <span className="toggle-label">{isDarkMode ? 'Dark' : 'Light'}</span>
    </button>
  )
}
