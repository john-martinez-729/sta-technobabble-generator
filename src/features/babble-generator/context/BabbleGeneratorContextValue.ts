import { createContext } from 'react'
import type { D20, D20Table, GeneratorKind } from '../data/babbleTables'
import type { BabbleResult } from '../logic/generator'

export type BabbleGeneratorContextValue = {
  activeTable: D20Table<string>
  isDarkMode: boolean
  generatorKind: GeneratorKind
  result: BabbleResult<string>
  changeGeneratorKind: (kind: GeneratorKind) => void
  generateResult: () => void
  rerollColumn: (column: string) => void
  selectRoll: (column: string, roll: D20) => void
  toggleDarkMode: () => void
}

export const BabbleGeneratorContext = createContext<BabbleGeneratorContextValue | null>(null)
