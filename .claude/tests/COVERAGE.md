# Requirements Coverage Übersicht

## REQ-001: MD → PPT Konverter

| REQ-ID | Titel | Testplan | Status | Anmerkungen |
|--------|-------|----------|--------|-------------|
| REQ-001 | MD → PPT Konverter | [Testplan](req-001-md-ppt-konverter.testplan.md) | **Teilweise gedeckt** | Parser und Config: voll. Generator: teilweise. E2E/CLI: fehlt. |

---

## Akzeptanzkriterien-Abdeckung (REQ-001)

| # | Akzeptanzkriterium | Abgedeckt? | Test-Referenz |
|---|---|---|---|
| 1 | CLI-Befehl `ppt-gen <datei.md>` erstellt `.pptx` | Nein | CLI-Exit-Codes nicht implementiert |
| 2 | `# Titel` erzeugt Slide 1 mit großem, zentriertem Titel | **Teilweise** | UT-1.2 (Output-String), UT-1.5 fehlt (render) |
| 3 | Optionaler Untertitel wird gerendert | **Teilweise** | PAR-1, PAR-2 testen Parser; UT-1.x fehlt Rendering-Test |
| 4 | Jede `##` erzeugt neue Folie | **Ja** | PAR-5 |
| 5 | `###` erscheint als Untertitel | **Ja** | PAR-6 |
| 6 | `- Listenpunkte` werden gerendert | **Teilweise** | PAR-7 testet Parser; UT-1.x fehlt Rendering-Test |
| 7 | `1.` nummeriert wird gerendert | **Teilweise** | PAR-8 testet Parser; UT-1.x fehlt Rendering-Test |
| 8 | `Absatztext` wird gerendert | **Teilweise** | PAR-9 testet Parser; UT-1.x fehlt Rendering-Test |
| 9 | `**fett**` / `*kursiv*` gerendert | **Teilweise** | PAR-14 testet Parser; UT-1.x fehlt Rendering-Test |
| 10 | `---` beendet Folie, Layout-Reset | **Teilweise** | PAR-10, PAR-11, PAR-12 testen Parsing |
| 11 | Ausgabedatei `<eingabe>.pptx` | Nein | `.pptx`-Ausgabe nicht auf Disk |
| 12 | Pfade mit Leerzeichen | Nein | CLI nicht implementiert |
| 13 | Ungültige Eingabe → Exit-Code ≠ 0 | Nein | CLI-Exit-Codes nicht implementiert |
| 14 | Semantische Warnung + Fallback | **Teilweise** | PAR-3, PAR-18 testen im Parser |

---

## Coverage-Zusammenfassung

| Kategorie | Tests geplant | Tests implementiert | Bestanden | Coverage |
|---|---|---|---|---|
| Unit-Tests (Config) | 6 | 6 | 6 | **100%** |
| Unit-Tests (Parser) | 22 | 18 | 18 | **82%** |
| Unit-Tests (Generator) | 15 | 4 | 4 | **27%** |
| Unit-Tests (Typen) | 0 | 0 | 0 | **TS-Kompilierzeit** |
| E2E-Tests | 12 | 0 | 0 | **0%** |
| CLI-Tests | 3 | 0 | 0 | **0%** |
| **Gesamt** | **58** | **28** | **28** | **~48%** |

---

## Blockaden

- `result.output` ist ein leerer String — keine `.pptx`-Datei wird auf Disk geschrieben. E2E-Tests benötigen die Pipeline-Vervollständigung.
- CLI-Exit-Codes (1/2) und Fehlerbehandlung für ungültige Eingaben sind noch nicht implementiert.
- 11 Generator-Tests (UT-1.5 bis UT-1.15) fehlen — sie testen das eigentliche Slide-Rendering.

---

## Nächste Schritte

1. **Generator-Tests vervollständigen** (UT-1.5 bis UT-1.15) — testen der slideCount-, title-, und content-Rendering-Logik.
2. **`.pptx`-Datei-Ausgabe auf Disk** implementieren.
3. **CLI-Exit-Codes** implementieren und testen.
4. **E2E-Tests** (ET-1 bis ET-12) schreiben.
5. **Parser-Tests** UT-3.19 bis UT-3.22 hinzufügen (leere MD, gemischte Listen, Multi-Line Untertitel).
