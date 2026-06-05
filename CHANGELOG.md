# Changelog

Alle bedeutenden Änderungen an diesem Projekt werden hier dokumentiert.

## [0.1.0] – 2026-06-05

### Hinzugefügt
- TypeScript-Projektstruktur mit pptxgenjs
- Generator für PowerPoint-Präsentationen
- CLI-Beispiel
- CLAUDE.md und README.md
- Grundlegende Konfiguration (Theme, Types)

### Baukasten
- Node.js >= 20 erforderlich
- Abhängigkeiten: pptxgenjs, @anthropic-ai/sdk

## [0.2.0] – 2026-06-05

### Hinzugefügt
- ESLint-Konfiguration (typescript-eslint, flat config)
- vitest.config.ts
- Erster Test für generator.ts
- CHANGELOG.md mit Workflow-Richtlinie

### Geändert
- tsconfig.json: moduleResolution → bundler (tsx-kompatibel)
- CLAUDE.md um CHANGELOG.md Workflow erweitert
