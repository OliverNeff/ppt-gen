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

**ALLES** was `.claude/requirements/` betrifft muss über den Agenten `analyst` laufen.

- Niemals `.claude/requirements/` Dateien direkt bearbeiten (Read/Write/Edit/Write)
- Niemals `INDEX.md` referenzieren — existiert nicht
- Wenn der User eine Anforderung beschreibt → sofort `analyst` Agent starten
- Wenn der User "in die Anforderungen aufnehmen", "REQ erstellen", "Status ändern" sagt → Agent verwenden
- Wenn der User "abgeschlossen" zu einer Anforderung sagt → Agent mit "abgeschlossen" prompt aufrufen

## Notizen & Archiv (Notable)

- Notizen liegen in `~/.notable/notes/`
- **ALLES** was `~/.notable/notes/` betrifft muss über den Agenten `archivist` laufen.
- Niemals `~/.notable/notes/` Dateien direkt bearbeiten (Read/Write/Edit)
- Wenn der User Notizen erstellen, bearbeiten oder suchen will → `archivist` Agent aufrufen
- Niemals Notiz-Dateien direkt lesen oder schreiben — immer den Archivist-Agenten verwenden

## Richtlinien

- Code auf Englisch, Kommentare auf Deutsch
- Conventional Commits (deutsch)
- Keine direkten Push auf main
- Kleine, inkrementelle Änderungen
- Nach jedem größeren Task: CHANGELOG.md aktualisieren

## CI-Fehler-Behandlung

Bei Fehlern in der CI-Pipeline (lint, tests, build):
- **NICHT selbst fixen** — direkt die Agents einsetzen:
  1. **Developer-Agent** → fixt den Fehler (linting, build, code quality)
  2. **Tester-Agent** → verifiziert dass lint/tests/build wieder durchgehen
- Nie manuell Code ändern oder Tests ausführen — immer Agents delegieren
- Immer erst den Developer fixen lassen, dann den Tester zur Prüfung anstoßen
- Der Developer soll sich TDD vor der Implementierung notieren

## Test-Driven Development (TDD)

- **Jede Implementierung beginnt mit Tests** — Write the tests first, then the implementation.
- TDD-Zyklus: **Red** (Test schreiben) → **Green** (Test erfolgreich) → **Refactor**
- Der Developer-Agent sollte sich TDD vor der Implementierung notieren.
- Beim Start eines Developer-Agents für eine Anforderung explizit TDD anfordern.
