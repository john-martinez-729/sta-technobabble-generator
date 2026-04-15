import { useBabbleGenerator } from '../hooks/useBabbleGenerator'

type RerollButtonProps = {
  column: string
  label: string
}

export function RerollButton({ column, label }: RerollButtonProps) {
  const { rerollColumn } = useBabbleGenerator()

  return (
    <button
      className="reroll-button"
      type="button"
      aria-label={`Reroll ${label}`}
      title={`Reroll ${label}`}
      onClick={() => rerollColumn(column)}
    >
      Re-roll
    </button>
  )
}
