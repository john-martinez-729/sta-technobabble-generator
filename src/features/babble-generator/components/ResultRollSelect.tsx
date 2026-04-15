import type { D20 } from '../data/babbleTables'
import { useBabbleGenerator } from '../hooks/useBabbleGenerator'

type ResultRollSelectProps = {
  column: string
  label: string
  roll: D20
}

export function ResultRollSelect({ column, label, roll }: ResultRollSelectProps) {
  const { activeTable, selectRoll } = useBabbleGenerator()
  const columnConfig = activeTable.columns.find(({ key }) => key === column)

  return (
    <select
      aria-label={`Select ${label}`}
      className="roll-select"
      value={roll}
      onChange={(event) => selectRoll(column, Number(event.target.value) as D20)}
    >
      {columnConfig?.entries.map((entry, index) => (
        <option value={index + 1} key={`${entry}-${index}`}>
          {index + 1}: {entry}
        </option>
      ))}
    </select>
  )
}
