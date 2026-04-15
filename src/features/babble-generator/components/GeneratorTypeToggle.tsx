import type { GeneratorKind } from '../data/babbleTables'
import { useBabbleGenerator } from '../hooks/useBabbleGenerator'

const generatorOptions: GeneratorKind[] = ['techno', 'medical']

const formatTitle = (kind: GeneratorKind) => (kind === 'techno' ? 'Techno' : 'Medical')

export function GeneratorTypeToggle() {
  const { changeGeneratorKind, generatorKind } = useBabbleGenerator()

  return (
    <div className="controls" aria-label="Generator type">
      {generatorOptions.map((kind) => (
        <button
          className="mode-button"
          type="button"
          aria-pressed={generatorKind === kind}
          key={kind}
          onClick={() => changeGeneratorKind(kind)}
        >
          {formatTitle(kind)}
        </button>
      ))}
    </div>
  )
}
