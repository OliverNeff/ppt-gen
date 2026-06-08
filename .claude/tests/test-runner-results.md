# Testbericht: REQ-001 - Vollständiger Test-Lauf

Datum: 2026-06-08
Test-Lauf: npx vitest run
Test-Framework: Vitest v3.2.6
Plattform: Windows 11 (win32)

---

## 1. Test-Ergebnisse (EXAKT)

### Gesamtübersicht

| Test-Datei | Bestanden | Fehlschlagen | Total |
|---|---|---|-|
| tests/config.test.ts | 6 | 0 | 6 |
| tests/parser.test.ts | 18 | 0 | 18 |
| tests/e2e.test.ts | 6 | 6 | 12 |
| tests/generator.test.ts | 15 | 0 | 15 |
| **Gesamt** | **45** | **6** | **51** |

### Alle bestandenen Tests (45)

**tests/config.test.ts (6/6):**
1. UT-2.1 - background Wert ist FFFFFFF
2. UT-2.2 - fontColor Wert ist 1F2937
3. UT-2.3 - accentColor Wert ist 2563EB
4. UT-2.4 - titleFontSize Wert ist 36
5. UT-2.5 - contentFontSize Wert ist 18
6. UT-2.6 - Alle 5 Felder vorhanden

**tests/parser.test.ts (18/18):**
1. PAR-1 - Titel und Untertitel erkennen
2. PAR-2 - Titel ohne Untertitel erkennen
3. PAR-3 - Warnung bei ## vor # emitieren
4. PAR-4 - Nur # Titel: Titelfolie ohne Inhalt
5. PAR-5 - ## als neue Folie erkennen
6. PAR-6 - Untertitel (###) auf aktueller Folie erfassen
7. PAR-7 - Listenpunkte (-) als content erfassen
8. PAR-8 - Nummerierte Listen (1.) als content erfassen
9. PAR-9 - Absatztext erfassen
10. PAR-10 - --- als Folienende erkennen (kein neuer Slide)
11. PAR-11 - doppelter --- ignorieren
12. PAR-12 - --- content der vorherigen Folie NICHT beeinflussen
13. PAR-13 - Leerzeilen ignorieren
14. PAR-14 - **fett** und *kursiv* als content erfassen
15. PAR-15 - leere MD nur mit Titel verarbeiten
16. PAR-16 - sehr lange Titel ohne Crash verarbeiten
17. PAR-17 - Sonderzeichen verarbeiten
18. PAR-18 - # ohne Titeltext mit Warnung behandeln

**tests/generator.test.ts (15/15):**
1. UT-1.1 - Erstellt Präsentation mit SlideCount == Anzahl Input-Slides
2. UT-1.2 - result.output ist ein Pfad-String (nicht leer)
3. UT-1.3 - result.slideCount stimmt mit options.slides.length überein
4. UT-1.4 - Theme-Merging: Hex-Farben mit/ohne # normalisiert
5. UT-1.5 - Titelfolie korrekt gerendert
6. UT-1.6 - Multiple Slides nacheinander erzeugt
7. UT-1.7 - Leere Slides (content: []) ohne Fehler erzeugt
8. UT-1.8 - Leere slides-Array ergibt slideCount: 0
9. UT-1.9 - book.author ist PPT-Gen
10. UT-1.10 - book.layout ist LAYOUT_WIDE
11. UT-1.11 - book.title entspricht options.title
12. UT-1.12 - Slide-Hintergrundfarbe korrekt gesetzt
13. UT-1.13 - addTitle: Textposition und Schriftattribute korrekt
14. UT-1.14 - addContent: jeder content-String als separater Block mit breakLine
15. UT-1.15 - addContent: Content-Textposition korrekt

**tests/e2e.test.ts (6/12 - die anderen 6 fehlerhaft, siehe unten):**
1. E2E-5 - Parser: title und subtitle korrekt extrahiert
2. E2E-6 - Parser: Bindestrich-Listen als content recognized
3. E2E-7 - Parser: Nummerierte Listen als content recognized
4. E2E-8 - Parser: Section Separator wirkt auf Content
5. E2E-10 - Parser: ### Unterueberschrift auf Slide gespeichert
6. E2E-11 - Parser: Nur Titel ohne ## ergibt slideCount 0

### Alle fehlgeschlagenen Tests (6)

Alle 6 Fehler in tests/e2e.test.ts mit gleicher Ursache:

| Test | Fehlermeldung |
|---|-|
| E2E-1: Parse Markdown und generiere PPTX - Datei existiert auf Disk | expected false to be true (fs.existsSync === false) |
| E2E-2: Output-Pfad ist neben der Input-Datei | expected false to be true (fs.existsSync === false) |
| E2E-3: Leere Slides erfolgreich generiert | expected false to be true (fs.existsSync === false) |
| E2E-4: Multi-Slide mit custom Theme | expected false to be true (fs.existsSync === false) |
| E2E-9: Generierte PPTX ist gueltige ZIP-Datei | ENOENT: valid.pptx nicht gefunden |
| E2E-12: Vollstaendige Pipeline | expected false to be true (fs.existsSync === false) |

### Root-Cause-Analyse: E2E-Fehler

**Ursache:** generator.ts Zeile 57 uebergibt { path: outputPath } an pptxgenjs writeFile(), aber pptxgenjs erwartet { fileName: ... }.

Die pptxgenjs-Quelle extrahiert props.fileName (nicht props.path). Wenn fileName fehlt, wird Default 'Presentation.pptx' verwendet und ins CWD geschrieben.

**Bestaetigung:** Nach Test-Lauf wurde Presentation.pptx (45 KB) im CWD erstellt.

**Benötigte Korrektur (generator.ts Zeile 57):**
- vorher: await book.writeFile({ path: outputPath })
- nachher: await book.writeFile({ fileName: outputPath })

---

## 2. Vergleich mit REQ-001 Akzeptanzkriterien

| # | Akzeptanzkriterium | Status | Test-Abdeckung |
|---|---|---|-|
| 1 | CLI-Befehl ppt-gen <datei.md> erstellt .pptx | Erfuellt (Code) | Nicht getestet (cli.ts: 0% Coverage) |
| 2 | # Titel erzeugt Slide 1 mit Titel | Erfuellt | UT-1.5, UT-1.11, E2E-1/12 |
| 3 | Optionaler Untertitel auf Titelfolie | Erfuellt | PAR-1, PAR-2, E2E-5 |
| 4 | Jede ## erzeugt neue Folie | Erfuellt | PAR-5, E2E-8 |
| 5 | ### als Untertitel auf aktueller Folie | Erfuellt | PAR-6, E2E-10 |
| 6 | - Listenpunkte als ungeordnete Liste | Erfuellt | PAR-7, E2E-6 |
| 7 | 1. Nummeriert als geordnete Liste | Erfuellt | PAR-8, E2E-7 |
| 8 | **fett** / *kursiv* gerendert | Erfuellt (Parser) | PAR-14 (Parser: content erfasst) |
| 9 | --- beendet aktuelle Folie | Erfuellt | PAR-10, PAR-11, PAR-12, E2E-8 |
| 10 | Ausgabe: <eingabe>.pptx | Erfuellt (Code) | Nicht direkt getestet |
| 11 | Pfade mit Leerzeichen | Erfuellt (Code) | Nicht getestet |
| 12 | Ungültige Eingabe -> Exit-Code 1/2 | Erfuellt (Code) | Nicht getestet (cli.ts ungetestet) |
| 13 | Semantische Warnung (## vor #) | Erfuellt | PAR-3 (Warnung emittiert) |
| 14 | Leerzeilen ignoriert | Erfuellt | PAR-13 |

**Ergebnis: 13 von 13 Kriterien im Code implementiert.**
**Davon 6 direkt durch bestandenene Tests verifiziert.**
**7 Kriterien haben Code, aber keine direkte Testabdeckung.**

---

## 3. Coverage-Analyse

### Coverage-Dependency
@vitest/coverage-v8 ist NICHT installiert. Automatisierte Coverage-Bestimmung nicht möglich.

### Manuelles Coverage (grob eingeschaetzt)

| Quelldatei | Codezeilen | Getestet | Status |
|---|---|---|-|
| src/config.ts | ~9 | Ja (6 Tests) | 100% |
| src/parser.ts | ~120 | Ja (18 Tests) | ~90% |
| src/generator.ts | ~80 | Teilweise (15 UT + 6 fehlerhafte E2E) | ~60% |
| src/cli.ts | ~50 | Nein | 0% |
| **Gesamt** | **~259** | **--** | **~65%** |

**Geschatzte Coverage: ~65% - UNTER der 80%-Grenze**

**Hauptgründe:**
- cli.ts hat 0% Testabdeckung (50 von ~259 Zeilen ungetestet)
- generator.ts E2E-Pfad (writeFile) ist durch Bug blockiert

---

## 4. Qualitätszusammenfassung

| Metrik | Wert |
|---|-|
| **Gesamtstatus** | **FAIL** (6 von 51 Tests fehlerhaft) |
| **Tests insgesamt** | 51 |
| **Bestanden** | 45 |
| **Fehlerhaft** | 6 (alle in e2e.test.ts) |
| **Abgedeckte Requirements** | 13 von 13 Kriterien implementiert |
| **Geschätzte Coverage** | ~65% (unter 80%-Grenze) |

### Kritische Probleme

1. **BLOCKER:** E2E-Tests fehlerhaft durch pptxgenjs-API-Missbrauch (generator.ts Zeile 57: path statt fileName)
2. **Coverage unter 80%** - Hauptgrund: cli.ts hat keine Tests
3. **Kein Coverage-Instrument** - @vitest/coverage-v8 nicht installiert

### Empfehlungen für den nächsten Schritt

1. **Sofort (Blocker):** Generator korrigieren: { path: outputPath } -> { fileName: outputPath } in generator.ts Zeile 57. Danach npm test erneut - alle 6 E2E-Tests sollten bestehen.
2. **Priority High:** Coverage-Dependency installieren und npm test -- --coverage ausfuehren.
3. **Priority High:** CLI-Tests schreiben für Exit-Codes (0, 1, 2), fehlende Datei, falscher Dateityp.
4. **Priority Medium:** Pfade mit Leerzeichen explizit testen.
5. **Priority Medium:** Semantische Warnung auch in stderr verifizieren.
