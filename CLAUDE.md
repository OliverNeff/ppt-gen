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

## Anforderungen & Fortschritt

- `.claude/requirements/ANFORDERUNGEN.md` — Master-Index aller Anforderungen mit Status-Tracker
- `.claude/requirements/STATUS.md` — Aktueller Arbeitsstatus (Fortsetzungsanker)
- `.claude/requirements/GESCHICHTE.md` — Historie abgeschlossener Arbeit
- Bei Unterbrechung: STATUS.md als Anker hinterlassen, bei Wiederaufnahme dort weiterlesen

### WICHTIG: Anforderungen-Verwaltung

**ALLES** was `.claude/requirements/` betrifft muss über den Agenten `requirements-manager` laufen.

- Niemals `.claude/requirements/` Dateien direkt bearbeiten (Read/Write/Edit/Write)
- Niemals `INDEX.md` referenzieren — existiert nicht
- Wenn der User eine Anforderung beschreibt → sofort `requirements-manager` Agent starten
- Wenn der User "in die Anforderungen aufnehmen", "REQ erstellen", "Status ändern" sagt → Agent verwenden
- Wenn der User "abgeschlossen" zu einer Anforderung sagt → Agent mit "abgeschlossen" prompt aufrufen

## Richtlinien

- Code auf Englisch, Kommentare auf Deutsch
- Conventional Commits (deutsch)
- Keine direkten Push auf main
- Kleine, inkrementelle Änderungen
- Nach jedem größeren Task: CHANGELOG.md aktualisieren
