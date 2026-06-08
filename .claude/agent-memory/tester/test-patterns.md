---
name: test-patterns
description: Test-Muster, häufige Fehlerquellen und bewährte Test-Strategien für PPT-Gen
metadata:
  type: reference
---

## Test-Strategie

### Unit-Tests
- **Framework:** Vitest (`vitest run`)
- **Struktur:** Pro Modul eine Test-Datei oder pro Funktion ein `describe`-Block
- **Pfade:** Absolute Pfade verwenden, Tests liegen in `tests/`
- **Mocking:** `pptxgenjs` wird nicht gemockt (es ist die Abhängigkeit, die getestet werden soll). Stattdessen die `generatePresentation()`-Schnittstelle nutzen.

### E2E-Tests
- Erzeugen MD-Testdateien temporär, führen `ppt-gen` aus, prüfen Output.
- Keine Tests die auf Timing oder Nicht-Determinismus basieren.
- Testdaten müssen isoliert sein (keine Seiteneffekte auf andere Tests).

### Fehlerbehandlung
- Exit-Code 0 = Erfolg
- Exit-Code 1 = Eingabefehler (fehlende Datei, falscher Typ)
- Exit-Code 2 = Generierungsfehler (intern)
- Fehlermeldungen in stderr
- Bei mehr als 3 fehlerhaften Tests → Priorität: Hoch, sofortiger Bug-Report

## Bekannte Projekteinschränkungen
- `generatePresentation()` gibt nur `{ slideCount, output: string }` zurück — die `.pptx` wird nicht auf Disk geschrieben. Tests müssen diesen Zustand kennen.
- `src/parser.ts` existiert noch nicht — MD-Parsering fehlt noch vollständig.
