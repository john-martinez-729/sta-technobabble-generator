import { useEffect } from "react";
import "./BabbleGenerator.css";
import { AppFooter } from "./components/AppFooter";
import { BabbleGeneratorHeader } from "./components/BabbleGeneratorHeader";
import { GeneratorTypeToggle } from "./components/GeneratorTypeToggle";
import { ResultPanel } from "./components/ResultPanel";
import { SourceTable } from "./components/SourceTable";
import { BabbleGeneratorProvider } from "./context/BabbleGeneratorContext";
import { useBabbleGenerator } from "./hooks/useBabbleGenerator";

export function BabbleGenerator() {
  return (
    <BabbleGeneratorProvider>
      <BabbleGeneratorContent />
    </BabbleGeneratorProvider>
  );
}

function BabbleGeneratorContent() {
  const { isDarkMode } = useBabbleGenerator();

  useEffect(() => {
    document.body.classList.toggle("theme-dark", isDarkMode);

    return () => document.body.classList.remove("theme-dark");
  }, [isDarkMode]);

  return (
    <main className={`app-shell ${isDarkMode ? "theme-dark" : ""}`}>
      <section className="generator-panel" aria-labelledby="app-title">
        <BabbleGeneratorHeader />

        <GeneratorTypeToggle />

        <ResultPanel />
      </section>

      <section className="table-section" aria-labelledby="table-title">
        <SourceTable />
      </section>

      <AppFooter />
    </main>
  );
}
