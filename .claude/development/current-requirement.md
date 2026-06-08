# REQ-001 — MD-PPT Konverter — Entwicklungstagebuch

## Arbeitsweise

- **Testgetrieben (TDD):** Zuerst Tests schreiben, dann Implementierung
- Inkrementelle Umsetzung — nach jedem Test-Success: Tests ausführen, sicherstellen dass sie grün sind

## Phase 1: Tests schreiben (ABGESCHLOSSEN)

- [x] Parser-Tests vorhanden (tests/parser.test.ts, PAR-1 bis PAR-18)
- [x] Config-Tests vorhanden (tests/config.test.ts, UT-2.1 bis UT-2.6)
- [x] 11 neue Generator-Tests (UT-1.5 bis UT-1.15) in tests/generator.test.ts hinzugefügt
- [x] Alle Tests in tests/generator.test.ts (insgesamt 15 Tests: 4 alt + 11 neu)

## Phase 2: Tester-Agent aufrufen (BLOCKIERT)

- [ ] Alle Tests ausführen (`npm test`) — **BLOCKIERT**: Kein Bash-Tool verfügbar
- [ ] tester-Agent als Sub-Agent aufrufen — **BLOCKIERT**: Kein TaskCreate-Tool verfügbar

## Phase 3: Implementierung anpassen (NOCH ZU BEGINNEN)

- [ ] Testergebnisse des testers auswerten
- [ ] generator.ts anpassen (pptx-Ausgabe, .pptx auf Disk schreiben)
- [ ] parser.ts anpassen (UT-3.19 bis UT-3.22, falls fehlerhaft)
- [ ] cli.ts anpassen (Exit-Codes 1 und 2)

## Phase 4: E2E-Tests (NOCH ZU BEGINNEN)

- [ ] ET-1 bis ET-12 schreiben
- [ ] Alle Tests grün machen

## Aktueller Stand der Tests

| Kategorie | Geplant | Implementiert | Status |
|-----------|---------|---------------|--------|
| Config (UT-2.x) | 6 | 6 | Alle bestanden |
| Parser (UT-3.x) | 22 | 18 | Alle bestanden |
| Generator (UT-1.x) | 15 | 15 | geschrieben, noch nicht ausgeführt |
| E2E (ET-1-12) | 12 | 0 | noch nicht geschrieben |
| CLI-Tests | 3 | 0 | noch nicht geschrieben |
| **Gesamt** | **58** | **39** | **Phase 1 abgeschlossen** |

## Blockaden

1. **Kein Bash-Tool**: Tests koennen nicht ueber `npm test` ausgefuehrt werden
2. **Kein TaskCreate-Tool**: tester-Agent kann nicht als Sub-Agent aufgerufen werden
3. **result.output ist leer**: .pptx-Datei wird noch nicht auf Disk geschrieben
4. **result.output Typ**: UT-1.2 testet `typeof result.output === "string"` aber value ist `""`

## Naechste Schritte

1. Bash-Tool verfuegbar machen fuer `npm test`
2. ODER tester-Agent manuell aufrufen
3. Testergebnisse auswerten
4. Implementierung anpassen
