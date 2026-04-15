import type { RollResult } from '../logic/generator'
import { RerollButton } from './RerollButton'
import { ResultRollSelect } from './ResultRollSelect'

type ResultBlockProps = {
  rollResult: RollResult<string>
}

export function ResultBlock({ rollResult }: ResultBlockProps) {
  const { column, label, roll, value } = rollResult

  return (
    <div className="roll-item">
      <div className="roll-item-header">
        <dt>{label}</dt>
        <RerollButton column={column} label={label} />
      </div>
      <dd>
        <span className="die-roll">Result: {roll}</span>
        <span>{value}</span>
      </dd>
      <ResultRollSelect column={column} label={label} roll={roll} />
    </div>
  )
}
