# Arbeitsstatus — PPT-Gen

Dient als Fortschritts-Tracker. Hier festhalten, wo die Arbeit stehen geblieben ist.

---

## Aktuelle Arbeit

### Aktives Feature / Task

- **Feature:** MD → PPT Konverter (REQ-001)
- **Started:** 2026-06-05
- **Status:** In Arbeit (Anforderung überarbeitet)
- **Nächster Schritt:** MD-Parser-Modul und Slide-Generator implementieren

### Geplante Features

- **Feature:** Professionelle Folienhintergründe (REQ-002)
- **Status:** Offen
- **Priorität:** Hoch
- **Geplant:** Nach REQ-001 abgeschlossen
- **Nächster Schritt:** pptxgenjs `background`-API prüfen, Theme-Konfiguration erweitern

### Offene To-Dos

- [ ] MD-Parser-Modul erstellen (src/parser.ts)
- [ ] MD-Struktur zu SlideConfig mappen
- [ ] CLI-Option für MD-Input hinzufügen
- [ ] Fehlerbehandlung für ungültige MD (Exit-Code 1/2)
- [ ] Titel-Folie mit optionalem Untertitel rendern
- [ ] `---` als Abschnittstrenner verarbeiten
- [ ] Tests für MD-Parser schreiben

### Blockierungen

- Keine

---

## Letzte Sitzung

- **Datum:** 2026-06-05
- **Was wurde erledigt:** REQ-001 Anforderung überarbeitet, Mapping-Regeln präzisiert, Akzeptanzkriterien konkretisiert, Design-Entscheidungen getroffen
- **Was bleibt:** Implementierung des MD-Parsers und Slide-Generators
