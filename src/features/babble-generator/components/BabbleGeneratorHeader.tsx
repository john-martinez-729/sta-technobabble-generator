import { DarkModeToggle } from './DarkModeToggle'

export function BabbleGeneratorHeader() {
  return (
    <div className="intro">
      <div className="intro-topline">
        <p className="eyebrow">Star Trek Adventures 2e Technobabble Generator</p>
        <DarkModeToggle />
      </div>
      <h1 id="app-title">Babble Generator</h1>
      <p className="lede">
        Generate a complete Trek-style technical fix or medical diagnosis from the source tables.
      </p>
    </div>
  )
}
