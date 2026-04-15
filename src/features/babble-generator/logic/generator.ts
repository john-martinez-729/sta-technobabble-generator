import type { D20, D20Table } from '../data/babbleTables'

export type RollResult<TColumn extends string> = {
  column: TColumn
  label: string
  roll: D20
  value: string
}

export type BabbleResult<TColumn extends string> = {
  phrase: string
  rolls: RollResult<TColumn>[]
}

const D20_SIDES = 20

export function rollD20(random = Math.random): D20 {
  return (Math.floor(random() * D20_SIDES) + 1) as D20
}

export function generateBabble<TColumn extends string>(
  table: D20Table<TColumn>,
  random = Math.random,
): BabbleResult<TColumn> {
  const rolls = table.columns.map(({ key, label, entries }) => {
    const roll = rollD20(random)

    return {
      column: key,
      label,
      roll,
      value: entries[roll - 1],
    }
  })

  return {
    phrase: rolls.map(({ value }) => value).join(' '),
    rolls,
  }
}
