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
```

## Wichtige Befehle

```bash
npm run build    # TypeScript kompilieren
npm start        # CLI-Beispiel ausführen
npm test         # Tests ausführen (vitest)
npm lint         # ESLint starten
```

## Architektur

- **generator.ts** nutzt `pptxgenjs` zum Erzeugen von PPTX-Dateien
- **types.ts** definiert alle Schnittstellen
- **config.ts** enthält DEFAULT_THEME
- AI-Integration ist als zukünftiges Feature in `types.ts` vorbereitet (AIGenerationConfig)

## Richtlinien

- Code auf Englisch, Kommentare auf Deutsch
- Conventional Commits (deutsch)
- Keine direkten Push auf main
- Kleine, inkrementelle Änderungen
