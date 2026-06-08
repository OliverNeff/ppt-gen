# Testplan: REQ-001 — MD → PPT Konverter

## Anforderung

Referenz: `.claude/requirements/ANFORDERUNGEN.md` — REQ-001

## Ziel

Stellen Sie sicher, dass die Markdown-zu-PowerPoint-Konvertierung korrekt funktioniert, sowohl auf Modulebene (Parser, Generator, Config) als auch im Gesamtsystem.

---

## 1. Modultests (Unit Tests)

### 1.1 `src/generator.ts` — `generatePresentation()`

**Bestehende Tests:** `tests/generator.test.ts` (4 Tests)

| Nr. | Test-ID | Zu testende Funktion | Test-Szenario | Typ | Status |
|-----|---------|---------|---|---|-----|---|
| UT-1.1 | `generator.test.ts` | `generatePresentation()` | Erstellt Präsentation mit SlideCount == Anzahl der Input-Slides | unit | **Implementiert** |
| UT-1.2 | `generator.test.ts` | `generatePresentation()` | `result.output` ist ein Pfad-String (nicht leer) | unit | **Implementiert** |
| UT-1.3 | `generator.test.ts` | `generatePresentation()` | `result.slideCount` stimmt mit `options.slides.length` überein | unit | **Implementiert** |
| UT-1.4 | `generator.test.ts` | `generatePresentation()` | Theme-Merging: `options.theme` überschreibt `DEFAULT_THEME` teilweise | unit | **Implementiert** |
| UT-1.5 | | `generatePresentation()` | Titel-Folie wird mit `addTitle()` und `addContent()` korrekt gerendelt | unit | **Feht** |
| UT-1.6 | | `generatePresentation()` | Multiple Slides werden nacheinander erzeugt (Slide 1 = Titelfolie, Slide 2+ = Inhalte) | unit | **Fehlt** |
| UT-1.7 | | `generatePresentation()` | Leere Slides (`content: []`) werden ohne Fehler erzeugt | unit | **Fehlt** |
| UT-1.8 | | `generatePresentation()` | Leere slides-Array (`slides: []`) ergibt `slideCount: 0` | unit | **Fehlt** |
| UT-1.9 | | `generatePresentation()` | `book.author` ist `"PPT-Gen"` | unit | **Fehlt** |
| UT-1.10 | | `generatePresentation()` | `book.layout` ist `"LAYOUT_WIDE"` | unit | **Fehlt** |
| UT-1.11 | | `generatePresentation()` | `book.title` entspricht `options.title` | unit | **Fehlt** |
| UT-1.12 | | `createSlide()` (internal) | Slide-Hintergrundfarbe wird korrekt gesetzt | unit | **Fehlt** |
| UT-1.13 | | `addTitle()` (internal) | Textposition und Schriftattribute korrekt | unit | **Fehlt** |
| UT-1.14 | | `addContent()` (internal) | Jeder content-String wird als separater Text-Block mit `breakLine: true` gerendert | unit | **Fehlt** |
| UT-1.15 | | `addContent()` (internal) | Content-Textposition korrekt | unit | **Fehlt** |

### 1.2 `src/config.ts` — `DEFAULT_THEME`

**Bestehende Tests:** `tests/config.test.ts` (6 Tests)

| Nr. | Test-ID | Zu testende Funktion | Test-Szenario | Typ | Status |
|-----|---------|---------|---|---|-----|---|
| UT-2.1 | `config.test.ts` | `DEFAULT_THEME.background` | Wert ist `"FFFFFF"` | unit | **Implementiert** |
| UT-2.2 | `config.test.ts` | `DEFAULT_THEME.fontColor` | Wert ist `"1F2937"` | unit | **Implementiert** |
| UT-2.3 | `config.test.ts` | `DEFAULT_THEME.accentColor` | Wert ist `"2563EB"` | unit | **Implementiert** |
| UT-2.4 | `config.test.ts` | `DEFAULT_THEME.titleFontSize` | Wert ist `36` | unit | **Implementiert** |
| UT-2.5 | `config.test.ts` | `DEFAULT_THEME.contentFontSize` | Wert ist `18` | unit | **Implementiert** |
| UT-2.6 | `config.test.ts` | `DEFAULT_THEME` | Alle 5 Felder vorhanden | unit | **Implementiert** |

### 1.3 `src/parser.ts` — `parseMarkdown()`

**Bestehende Tests:** `tests/parser.test.ts` (18 Tests)

| Nr. | Test-ID | Zu testende Funktion | Test-Szenario | Typ | Status |
|-----|---------|---------|---|---|-----|---|
| UT-3.1 | `parser.test.ts` | `parseMarkdown()` Titelfolie | Titel und Untertitel erkennen (PAR-1) | unit | **Implementiert** |
| UT-3.2 | `parser.test.ts` | `parseMarkdown()` Titelfolie | Titel ohne Untertitel (PAR-2) | unit | **Implementiert** |
| UT-3.3 | `parser.test.ts` | `parseMarkdown()` Warnung | Warnung bei `##` vor `#` (PAR-3) | unit | **Implementiert** |
| UT-3.4 | `parser.test.ts` | `parseMarkdown()` Titelfolie | Nur `#` Titel → Titelfolie ohne Inhalt (PAR-4) | unit | **Implementiert** |
| UT-3.5 | `parser.test.ts` | `parseMarkdown()` Inhaltsfolien | `##` als neue Folie (PAR-5) | unit | **Implementiert** |
| UT-3.6 | `parser.test.ts` | `parseMarkdown()` Inhaltsfolien | `###` als Folien-Untertitel (PAR-6) | unit | **Implementiert** |
| UT-3.7 | `parser.test.ts` | `parseMarkdown()` Listen | `- Listenpunkte` als content (PAR-7) | unit | **Implementiert** |
| UT-3.8 | `parser.test.ts` | `parseMarkdown()` Listen | `1.` nummerierte Listen als content (PAR-8) | unit | **Implementiert** |
| UT-3.9 | `parser.test.ts` | `parseMarkdown()` Absatz | Absatztext erfassen (PAR-9) | unit | **Implementiert** |
| UT-3.10 | `parser.test.ts` | `parseMarkdown()` Trenner | `---` als Folienende (PAR-10) | unit | **Implementiert** |
| UT-3.11 | `parser.test.ts` | `parseMarkdown()` Trenner | Doppelter `---` ignorieren (PAR-11) | unit | **Implementiert** |
| UT-3.12 | `parser.test.ts` | `parseMarkdown()` Trenner | `---` beeinflusst content nicht (PAR-12) | unit | **Implementiert** |
| UT-3.13 | `parser.test.ts` | `parseMarkdown()` Leerzeilen | Leerzeilen ignorieren (PAR-13) | unit | **Implementiert** |
| UT-3.14 | `parser.test.ts` | `parseMarkdown()` Formatierung | `**fett**` und `*kursiv*` als content (PAR-14) | unit | **Implementiert** |
| UT-3.15 | `parser.test.ts` | `parseMarkdown()` Randfälle | Nur `# Titel` ohne Slides (PAR-15) | unit | **Implementiert** |
| UT-3.16 | `parser.test.ts` | `parseMarkdown()` Randfälle | Sehr langer Titel (PAR-16) | unit | **Implementiert** |
| UT-3.17 | `parser.test.ts` | `parseMarkdown()` Randfälle | Sonderzeichen (Umlaute, Emojis, CJK) (PAR-17) | unit | **Implementiert** |
| UT-3.18 | `parser.test.ts` | `parseMarkdown()` Randfälle | `#` ohne Titeltext → Warnung (PAR-18) | unit | **Implementiert** |
| UT-3.19 | | `parseMarkdown()` Formatierung | `**fett**` als content (PAR-14 erweitert) | unit | **Fehlt** |
| UT-3.20 | | `parseMarkdown()` Randfälle | Leere MD-Strings und nur Whitespace | unit | **Fehlt** |
| UT-3.21 | | `parseMarkdown()` Listen | Gemischte nummerierte/unnummerierte Listen | unit | **Fehlt** |
| UT-3.22 | | `parseMarkdown()` Titelfolie | Untertitel über mehrere Zeilen (Multi-Line) | unit | **Fehlt** |

### 1.4 `src/types.ts` — Typ-Schnittstellen

**Status:** TypeScript-Compiler schützt die Typen zur Kompilierzeit.
**Zusätzliche Laufzeit-Tests nicht erforderlich** — Typ-Validierung durch TS-Kompilierzeit.

### 1.5 `src/cli.ts` — CLI-Einstiegspunkt

**Status:** CLI existiert nur als Beispielaufruf. Keine Exit-Code- oder Fehlerbehandlungs-Tests möglich, da diese noch nicht implementiert sind.

---

## 2. Systemtest (End-to-End)

### 2.1 Komplette MD → PPT Pipeline

| Nr. | Test-Szenario | Typ | Status |
|-----|---------|---|-----|
| ET-1 | Erstelle MD mit Titel, Untertitel, 3 Inhaltsfolien, Listen, nummerierter Liste, Unterüberschrift, Absatztext, Formatierung, `---`. Prüfe Output-PPTX | e2e | **Fehlt** — `.pptx`-Ausgabe noch nicht auf Disk |
| ET-2 | MD mit Leerzeilen — ignoriert, keine zusätzlichen Slides | e2e | **Fehlt** |
| ET-3 | MD mit Leerzeichen im Pfad | e2e | **Fehlt** |
| ET-4 | MD ohne `---` — Graceful Degradation | e2e | **Fehlt** |
| ET-5 | Nur `# Titel` (keine `##`) | e2e | **Fehlt** |
| ET-6 | `##` vor `#` — Warnung + Fallback-Titel | e2e | **Teilweise** — Parser testet Fallback (PAR-3) |
| ET-7 | Nicht existierende Datei → Exit-Code 1 | e2e | **Fehlt** — CLI-Exit-Codes nicht implementiert |
| ET-8 | Falscher Dateityp → Exit-Code 1 | e2e | **Fehlt** — CLI-Exit-Codes nicht implementiert |
| ET-9 | MD mit leerem Inhalt | e2e | **Fehlt** |
| ET-10 | Ausgabe im gleichen Verzeichnis | e2e | **Fehlt** |

### 2.2 Theme-System

| Nr. | Test-Szenario | Typ | Status |
|-----|---------|---|-----|
| ET-11 | Benutzer-Theme wird auf `DEFAULT_THEME` gemerged | e2e | **Teilweise** — UT-1.4 testet Merging |
| ET-12 | Alle Theme-Felder auf Folien angewendet | e2e | **Fehlt** |

---

## 3. Fehlerbehandlung und Randfälle

| Nr. | Test-Szenario | Typ | Status |
|-----|---------|---|-----|
| ER-1 | `generatePresentation()` mit `null`/`undefined` → Typ-Schutz | unit | **Fehlt** — TypeScript schützt, aber Runtime-Fallback ungetestet |
| ER-2 | Sehr lange Titel (> 100 Zeichen) | e2e | **Teilweise** — PAR-16 testet bis 200 Zeichen |
| ER-3 | Sehr viele Slides (> 50) | e2e | **Fehlt** |
| ER-4 | Sonderzeichen (Umlaute, Emojis, CJK) | e2e | **Teilweise** — PAR-17 testet im Parser |
| ER-5 | Doppelter `---` → Kein doppelter Slide | e2e | **Teilweise** — PAR-11 testet im Parser |
| ER-6 | MD mit `#` ohne Titeltext → Warnung | e2e | **Teilweise** — PAR-18 testet im Parser |

---

## Coverage-Status

- [x] Gedeckt — Parser-Tests (18/22 UT-3.x)
- [x] Gedeckt — Config-Tests (6/6 UT-2.x)
- [x] Gedeckt — Generator-Tests (4/15 UT-1.x)
- [ ] **Fehlt** — Generator-Tests UT-1.5 bis UT-1.15 (11 Tests)
- [ ] **Fehlt** — Parser-Tests UT-3.19 bis UT-3.22 (4 Tests)
- [ ] **Fehlt** — E2E-Tests ET-1 bis ET-12 (12 Tests)
- [ ] **Fehlt** — CLI-Exit-Codes und Fehlerbehandlung

## Anmerkungen

- **Aktueller Teststand:** 28 Tests implementiert und alle bestanden.
- **Blockade für E2E-Tests:** `result.output` gibt nur einen leeren String zurück, keine `.pptx`-Datei wird geschrieben. E2E-Tests benötigen die vollständige Pipeline-Implementierung.
- **Blockade für CLI-Tests:** CLI-Exit-Codes (1/2) sind noch nicht implementiert.
- **Priorität:** Generator-Tests UT-1.5 bis UT-1.15 (11 Tests) sind dringend erforderlich — sie testen die eigentliche Slide-Rendering-Logik.
