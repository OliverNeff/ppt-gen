# Anforderungen — PPT-Gen

Dieser Ordner dient der persistenten Speicherung von Anforderungen und Projektstatus.

## Dateien

| Datei | Zweck |
|---|-|
| `ANFORDERUNGEN.md` | Master-Index mit Status-Tracker und Templates |
| `STATUS.md` | Fortschritts-Tracker (Wo stecken wir?) |
| `GESCHICHTE.md` | Historie abgeschlossener Arbeit |

## Workflow

1. **Neue Anforderung:** Eintrag in `ANFORDERUNGEN.md` mit dem Template erstellen
2. **Beginn der Arbeit:** Feature und Startdatum in `STATUS.md` eintragen, Anforderung auf "In Arbeit" setzen
3. **Während der Arbeit:** To-Dos in `STATUS.md` führen, bei Unterbrechung letzte Position notieren
4. **Abgeschlossen:** In `ANFORDERUNGEN.md` auf "Erledigt" setzen, Eintrag nach `GESCHICHTE.md` verschieben, `STATUS.md` leeren

## Bedienung

Claude Code und der User arbeiten hier zusammen:
- Bei Unterbrechung: `STATUS.md` als "Fortsetzungsanker" hinterlassen
- Bei Wiederaufnahme: `STATUS.md` prüfen → nächste Anforderung in `ANFORDERUNGEN.md` → arbeiten
