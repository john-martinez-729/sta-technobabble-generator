import { resultInstructions } from '../data/resultInstructions'
import { useBabbleGenerator } from '../hooks/useBabbleGenerator'
import { ResultBlock } from './ResultBlock'

export function ResultPanel() {
  const { activeTable, generateResult, result } = useBabbleGenerator()
  const isMedicalResult = activeTable.id === 'medical'

  return (
    <section className="result-panel" aria-live="polite">
      <p className="result-label">{activeTable.title}</p>
      <p className="result-instructions">{resultInstructions[activeTable.id]}</p>
      {isMedicalResult ? (
        <dl className="medical-summary">
          {result.rolls.map(({ column, label, value }) => (
            <div className="medical-summary-item" key={column}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="result-text">{result.phrase}</p>
      )}

      <dl className="roll-list">
        {result.rolls.map((rollResult) => (
          <ResultBlock rollResult={rollResult} key={rollResult.column} />
        ))}
      </dl>

      <button className="generate-button" type="button" onClick={generateResult}>
        Generate Babble
      </button>
    </section>
  )
}
