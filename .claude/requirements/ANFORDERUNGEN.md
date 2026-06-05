# Anforderungen — PPT-Gen

Master-Index aller Projektanforderungen. Eintrag für jede Anforderung, Status-Tracker und Priorisierung.

---

## Status-Tracker

| ID   | Titel                        | Status     | Priorität | Erstellt   | Abgeschlossen |
| ---  | ---------------------------- | ---------- | --------- | ---------- | ------------- |
| REQ-001 | MD → PPT Konverter         | In Arbeit  | Hoch      | 2026-06-05 |               |

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

**Status:** In Arbeit
**Priorität:** Hoch
**Erstellt:** 2026-06-05
**Abgeschlossen:**

#### Beschreibung

Aus einer Markdown-Datei soll eine PowerPoint-Präsentation automatisch generiert werden können.

#### MD-Struktur → PPT-Mapping

**Konvention:** Die MD-Datei beginnt mit genau einer `#`-Zeile als Titelfolie. Jede `##`-Zeile markiert den Beginn einer neuen Folie. `---` trennt Abschnitte (verpflichtend, nicht optional).

```markdown
# Titel der Präsentation
Optionaler Untertitel

## Einführung
Kurzer Text zur Einleitung.

## Hauptthema
- Erster Aufzählungspunkt
- Zweiter Aufzählungspunkt
- Dritter Aufzählungspunkt

### Untertitel
Zusätzlicher Text unter der Unterüberschrift.

## Zusammenfassung
Fazit der Präsentation.
```

**Mapping-Regeln:**

| Markdown-Syntax | PowerPoint-Element |
|---|---|
| `# Titel` | Titel-Folie (Slide 1) — großer Titel zentriert, optionaler Untertitel darunter |
| `## Überschrift` | Neue Folie — Überschrift als Titel der Folie |
| `### Unterüberschrift` | Untertitel auf der aktuellen Folie (unter der `##`-Überschrift) |
| `- Listenpunkt` |ungeordnete Liste (Bulletpoints) |
| `1. Nummeriert` | Geordnete Liste |
| `Absatztext` | Fließtext auf der Folie |
| `**fett**` / `*kursiv*` | Textformatierung |
| `---` | Abschnittstrenner — beendet aktuelle Folie, beginnt keine neue (Layout-Reset) |
| Leerzeilen | ignoriert |

**Titel-Folie (Slide 1) — Spezifikation:**
- Zeigt den Text nach `#` als großen, zentrierten Titel.
- Optional: Die erste nicht-leere Zeile nach `# Titel` (ohne `##`-Prefix) wird als Untertitel darunter gerendert.
- Wenn kein `---` oder `##` folgt, ist der Text nach `#` allein der Titel ohne Untertitel.

**Beispiel — Titelfolie mit und ohne Untertitel:**
```markdown
# Haupttitel
Das ist der Untertitel
## nächste Folie
```
→ Titel: "Haupttitel", Untertitel: "Das ist der Untertitel".

```markdown
# Haupttitel

## nächste Folie
```
→ Titel: "Haupttitel", kein Untertitel.

**Output-Dateiname:**
- Wird aus dem Eingabe-MD-Dateinamen abgeleitet: `folien.md` → `folien.pptx`.
- Ausgabe im gleichen Verzeichnis wie die Eingabedatei.

**Fehlerbehandlung:**
- Ungültige MD-Datei (nicht lesbar, Dateityp falsch) → Fehlermeldung in stderr + Exit-Code ≠ 0 + keine .pptx-Datei schreiben.
- Semantisch ungültige MD (z.B. `##` vor `#`) → Warnung in stderr + Fallback: `# Titel` wird als Titel eingefügt.

**Nicht priorisierte Elemente (zukünftige Erweiterungen):**
- Zitate (`> Text`)
- Bilder (`![Alt](url)`)
- Code-Blöcke (```)

#### Akzeptanzkriterien

- [ ] CLI-Befehl `ppt-gen <datei.md>` erstellt `.pptx`-Datei im gleichen Verzeichnis
- [ ] `# Titel` erzeugt Slide 1 mit großem, zentriertem Titel
- [ ] Optionaler Untertitel auf der Titelfolie wird gerendert, wenn vorhanden
- [ ] Jede `## Überschrift` erzeugt eine neue Folie mit Überschrift als Titel
- [ ] `### Unterüberschrift` erscheint als Untertitel auf der aktuellen Folie
- [ ] `- Listenpunkte` werden als ungeordnete Liste auf der Folie gerendert
- [ ] `1. Nummeriert` wird als geordnete Liste gerendert
- [ ] `Absatztext` wird als Fließtext auf der Folie gerendert
- [ ] `**fett**` und `*kursiv*` werden als Textformatierung gerendert
- [ ] `---` beendet die aktuelle Folie und startet keine neue (Layout-Reset)
- [ ] Ausgabedatei heißt `<eingabe>.pptx` (gleicher Name, gleiche Lage)
- [ ] Pfade mit Leerzeichen im MD-Eingabe-Pfad werden korrekt verarbeitet
- [ ] Ungültige Eingabe (nicht existierende Datei, falscher Dateityp) → Fehlermeldung in stderr + Exit-Code ≠ 0 + keine .pptx-Datei
- [ ] Semantische Warnung (z.B. `##` vor `#`) → Warnung in stderr + Fallback-Titel

#### Kontext / Entschiede

- **Titel-Folie:** Nur `# Titel` → Titel zentriert. Optionaler Untertitel = erste Zeile nach `#` ohne `##`-Prefix.
- **`---`:** Verpflichtend als Abschnittstrenner (nicht optional).
- **Output-Dateiname:** Ableiten aus MD-Dateiname (`folien.md` → `folien.pptx`).
- **Fehlerbehandlung:** Konkrete Exit-Codes — 0 bei Erfolg, 1 bei Eingabefehler, 2 bei Generierungsfehler.
- **Erweiterbare Elemente:** Zitate, Bilder, Code-Blöcke als niedrig-priorität markiert.

#### Umgesetzte Dateien

_Nothing yet._

---

## Erledigte Anforderungen

_Nothing yet._

---

## Verworfene Anforderungen

_Nothing yet._
