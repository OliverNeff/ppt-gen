# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt-Struktur

```
src/
├── index.ts       -- Package-Exporte (pub API)
├── cli.ts         -- CLI-Einstiegspunkt (Beispiel-Presentation)
├── generator.ts   -- Hauptlogik: Folien erstellen, Text, Layout
├── types.ts       -- Shared Types (SlideConfig, ThemeConfig, etc.)
├── config.ts      -- Standardeinstellungen (Theme)
tests/
└── generator.test.ts
CHANGELOG.md       -- Alle bedeutenden Änderungen (SemVer-Format)
```

## Wichtige Befehle

```bash
npm run build    # TypeScript kompilieren (tsc)
npm start        # CLI-Beispiel ausführen (tsx)
npm run dev      # Watch-Modus (tsx watch)
npm test         # Tests ausführen (vitest)
npm run lint     # ESLint starten
npm run clean    # dist/ entfernen
```

## Architektur

- **generator.ts** nutzt `pptxgenjs` zum Erzeugen von PPTX-Dateien
- **types.ts** definiert alle Schnittstellen (AIGenerationConfig vorbereitet)
- **config.ts** enthält DEFAULT_THEME
- ESLint mit `typescript-eslint` (flat config)
- Vitest als Test-Launcher

## Richtlinien

- Code auf Englisch, Kommentare auf Deutsch
- Conventional Commits (deutsch)
- Keine direkten Push auf main
- Kleine, inkrementelle Änderungen
- Nach jedem größeren Task: CHANGELOG.md aktualisieren
