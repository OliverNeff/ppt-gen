---
name: requirements-coverage
description: Coverage-Status von REQ-001 — Testplan, Coverage-Datei, Blockaden, aktuelle Testergebnisse
metadata:
  type: project
---

## Coverage-Status (Stand 2026-06-07)

- **Testplan:** `.claude/tests/req-001-md-ppt-konverter.testplan.md`
- **Coverage-Übersicht:** `.claude/tests/COVERAGE.md`
- **Tests insgesamt:** 28 (alle bestanden)
- **Coverage gesamt:** ~48% von geplanten 58 Tests

### Aufteilung:
- Config-Tests: 6/6 (100%) — alle in `tests/config.test.ts`
- Parser-Tests: 18/22 (82%) — alle in `tests/parser.test.ts`, 4 Tests (UT-3.19 bis UT-3.22) fehlen
- Generator-Tests: 4/15 (27%) — alle in `tests/generator.test.ts`, 11 Tests (UT-1.5 bis UT-1.15) fehlen
- E2E/CLI: 0/15 — CLI-Exit-Codes und `.pptx`-Disk-Ausgabe noch nicht implementiert

### Blockaden:
- `result.output` ist ein leerer String — keine `.pptx`-Datei wird auf Disk geschrieben
- CLI-Exit-Codes (1/2) und Fehlerbehandlung fur ungultige Eingaben fehlen

### Nächste Schritte fur den Developer:
1. Generator-Tests UT-1.5 bis UT-1.15 vervollstandigen
2. `.pptx`-Datei-Ausgabe auf Disk implementieren
3. CLI-Exit-Codes implementieren
4. E2E-Tests schreiben
