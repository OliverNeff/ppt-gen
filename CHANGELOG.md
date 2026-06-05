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

## [0.3.0] – 2026-06-05

### Hinzugefügt
- `.claude/requirements/` — Erforderungs- und Fortschritts-System
- `ANFORDERUNGEN.md` — Master-Index mit Anforderungstemplate
- `STATUS.md` — Fortsetzungsanker für Claude Code
- `GESCHICHTE.md` — Historie abgeschlossener Arbeit

## [0.3.1] – 2026-06-05

### Hinzugefügt
- REQ-001: MD → PPT Konverter (Anforderung erstellt und überarbeitet)

### Spezifiziert
- Mapping-Regeln: `#` → Titelfolie, `##` → neue Folie, `###` → Untertitel, `-` → Bulletpoints, `1.` → geordnete Liste
- `---` als verpflichtender Abschnittstrenner (nicht optional)
- Titel-Folie: großer zentrierter Titel, optionaler Untertitel (erste Zeile nach `#` ohne `##`)
- Output-Dateiname: aus MD-Dateiname abgeleitet (`folien.md` → `folien.pptx`)
- Fehlerbehandlung: Exit-Code 1 (Eingabefehler), Exit-Code 2 (Generierungsfehler)
- Erweiterbare Elemente (Zitate, Bilder, Code-Blöcke) als niedrig priorisiert markiert
