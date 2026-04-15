import { babbleTables, type D20, type D20Table, type GeneratorKind } from '../data/babbleTables'
import { generateBabble, type BabbleResult } from './generator'

export function getBabbleTable(kind: GeneratorKind): D20Table<string> {
  return kind === 'techno' ? babbleTables.techno : babbleTables.medical
}

export function generateForKind(kind: GeneratorKind): BabbleResult<string> {
  return generateBabble(getBabbleTable(kind))
}

export function updateResultRoll(
  result: BabbleResult<string>,
  table: D20Table<string>,
  column: string,
  roll: D20,
): BabbleResult<string> {
  const columnConfig = table.columns.find(({ key }) => key === column)

  if (!columnConfig) {
    return result
  }

  const rolls = result.rolls.map((rollResult) =>
    rollResult.column === column
      ? {
          ...rollResult,
          roll,
          value: columnConfig.entries[roll - 1],
        }
      : rollResult,
  )

  return {
    phrase: rolls.map(({ value }) => value).join(' '),
    rolls,
  }
}
