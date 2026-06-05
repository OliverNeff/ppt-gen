# Anforderungen — PPT-Gen

Master-Index aller Projektanforderungen. Eintrag für jede Anforderung, Status-Tracker und Priorisierung.

---

## Status-Tracker

| ID   | Titel                        | Status     | Priorität | Erstellt   | Abgeschlossen |
| ---  | ---------------------------- | ---------- | --------- | ---------- | ------------- |
| REQ-001 | MD → PPT Konverter         | Offen      | Hoch      | 2026-06-05 |               |

---

## Anforderungstemplate

```markdown
### REQ-XXX — Titel

**Status:** Offen | In Arbeit | Erledigt | Verworfen
**Priorität:** Hoch | Mittel | Niedrig
**Erstellt:** YYYY-MM-DD
**Abgeschlossen:** (optional)

#### Beschreibung

Kurze Beschreibung der Anforderung.

#### Akzeptanzkriterien

- [ ] Kriterium 1
- [ ] Kriterium 2
- [ ] Kriterium 3

#### Kontext / Notizen

Zusätzliche Informationen, Entscheiungen, Abhängigkeiten.

#### Umgesetzte Dateien

- `src/...`
- `tests/...`
```

---

## Offene Anforderungen

### REQ-001 — MD → PPT Konverter

**Status:** Offen
**Priorität:** Hoch
**Erstellt:** 2026-06-05
**Abgeschlossen:**

#### Beschreibung

Aus einer Markdown-Datei soll eine PowerPoint-Präsentation automatisch generiert werden können.

#### MD-Struktur → PPT-Mapping

Die MD-Datei verwendet folgende Struktur:

```markdown
# Titel der Präsentation

## Einführungsfolie
Ein kurzer Absatz zum Einstieg.

## Folie 1: Konzept
- Punkt eins
- Punkt zwei
- Punkt drei

## Folie 2: Details
Absatztext mit weiteren Erläuterungen.

- Listenpunkt A
- Listenpunkt B

## Zusammenfassung
Fazit der Präsentation.
```

Mapping-Regeln:
- `# Titel` → Titel-Folie (vollbild, großer Titel, Untertitel optional)
- `## Überschrift` → Neue Folie mit Titelfolie + Inhalt
- `- Listenpunkt` → Bulletpoints auf der Folie
- `Absatztext` → Fließtext-Inhalt
- `---` → Abschnittstrennung (optionale Layout-Änderung)
- Leerzeilen → ignoriert

#### Akzeptanzkriterien

- [ ] `# Titel` erstellt eine Titel-Folie (zentriert, groß)
- [ ] `## Überschrift` erstellt neue Folien mit Titel + Inhalt
- [ ] `- Listenpunkte` werden als Bulletpoints gerendert
- [ ] Absatztext als Fließtext auf der Folie
- [ ] `---` wird als Abschnittstrenner erkannt (optional)
- [ ] Fehlerhafte MD führt zu Fehlermeldung, nicht zu Absturz
- [ ] Ausgabe als .pptx-Datei mit exportiertem Dateipfad in der Konsole

#### Kontext / Notizen

Die MD-Struktur soll intuitiv sein und natürlichem MarkdownWriting entsprechen. Die Generator-Logik in `src/generator.ts` kann als Basis wiederverwendet werden.

#### Umgesetzte Dateien

_Nothing yet._

---

## Erledigte Anforderungen

_Nothing yet._

---

## Verworfene Anforderungen

_Nothing yet._
