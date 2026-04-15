import { useMemo, useState, type ReactNode } from 'react'
import { BabbleGeneratorContext } from './BabbleGeneratorContextValue'
import type { D20, GeneratorKind } from '../data/babbleTables'
import { generateForKind, getBabbleTable, updateResultRoll } from '../logic/babbleResult'
import { rollD20, type BabbleResult } from '../logic/generator'

const THEME_STORAGE_KEY = 'babble-generator-theme'

function getInitialDarkMode() {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (savedTheme === 'dark') {
    return true
  }

  if (savedTheme === 'light') {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function BabbleGeneratorProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode)
  const [generatorKind, setGeneratorKind] = useState<GeneratorKind>('techno')
  const [result, setResult] = useState<BabbleResult<string>>(() => generateForKind('techno'))

  const activeTable = useMemo(() => getBabbleTable(generatorKind), [generatorKind])

  function changeGeneratorKind(nextKind: GeneratorKind) {
    setGeneratorKind(nextKind)
    setResult(generateForKind(nextKind))
  }

  function generateResult() {
    setResult(generateForKind(generatorKind))
  }

  function selectRoll(column: string, roll: D20) {
    setResult((currentResult) => updateResultRoll(currentResult, activeTable, column, roll))
  }

  function rerollColumn(column: string) {
    selectRoll(column, rollD20())
  }

  function toggleDarkMode() {
    setIsDarkMode((currentMode) => {
      const nextMode = !currentMode

      window.localStorage.setItem(THEME_STORAGE_KEY, nextMode ? 'dark' : 'light')

      return nextMode
    })
  }

  return (
    <BabbleGeneratorContext.Provider
      value={{
        activeTable,
        isDarkMode,
        generatorKind,
        result,
        changeGeneratorKind,
        generateResult,
        rerollColumn,
        selectRoll,
        toggleDarkMode,
      }}
    >
      {children}
    </BabbleGeneratorContext.Provider>
  )
}
