import { describe, expect, it } from "vitest"
import { parseMarkdown } from "../src/parser"

describe("parseMarkdown — Titelfolie", () => {
  it("PAR-1: SollteTitel und Untertitel erkennen", () => {
    const md = "# Mein Titel\nDas ist der Untertitel\n\n## Inhalt\nText"
    const result = parseMarkdown(md)
    expect(result.title).toBe("Mein Titel")
    expect(result.subtitle).toBe("Das ist der Untertitel")
  })

  it("PAR-2: SollteTitel ohne Untertitel erkennen", () => {
    const md = "# Mein Titel\n\n## Inhalt\nText"
    const result = parseMarkdown(md)
    expect(result.title).toBe("Mein Titel")
    expect(result.subtitle).toBeUndefined()
  })

  it("PAR-3: SollteWarnung bei ## vor # emitieren", () => {
    const md = "## Ohne Titel\nText"
    const warnings: string[] = []
    parseMarkdown(md, { onWarning: (w) => warnings.push(w) })
    expect(warnings.length).toBeGreaterThan(0)
  })

  it("PAR-4: Sollte bei nur # Titel eine Titelfolie ohne Inhalt erstellen", () => {
    const md = "# Nur Titel"
    const result = parseMarkdown(md)
    expect(result.title).toBe("Nur Titel")
    expect(result.slides).toHaveLength(0)
  })
})

describe("parseMarkdown — Inhaltsfolien", () => {
  it("PAR-5: Sollte ## als neue Folie erkennen", () => {
    const md = "# Titel\n\n## Folie 1\nInhalt\n\n## Folie 2\nMehr Inhalt"
    const result = parseMarkdown(md)
    expect(result.slides).toHaveLength(2)
    expect(result.slides[0].title).toBe("Folie 1")
    expect(result.slides[1].title).toBe("Folie 2")
  })

  it("PAR-6: Sollte Untertitel (###) auf der aktuellen Folie erfassen", () => {
    const md = "# Titel\n\n## Haupt\n### Unterkapitel\nText"
    const result = parseMarkdown(md)
    expect(result.slides).toHaveLength(1)
    expect(result.slides[0].subtitle).toBe("Unterkapitel")
  })

  it("PAR-7: Sollte Listenpunkte (-) als content erfassen", () => {
    const md = "# Titel\n\n## Liste\n- Punkt eins\n- Punkt zwei\n- Punkt drei"
    const result = parseMarkdown(md)
    expect(result.slides[0].content).toEqual(["Punkt eins", "Punkt zwei", "Punkt drei"])
  })

  it("PAR-8: Sollte nummerierte Listen (1.) als content erfassen", () => {
    const md = "# Titel\n\n## Schritte\n1. Erster Schritt\n2. Zweiter Schritt"
    const result = parseMarkdown(md)
    expect(result.slides[0].content).toEqual(["Erster Schritt", "Zweiter Schritt"])
  })

  it("PAR-9: Sollte Absatztext erfassen", () => {
    const md = "# Titel\n\n## Text\nDas ist ein Absatz.\n\nDas ist der zweite Absatz."
    const result = parseMarkdown(md)
    expect(result.slides[0].content).toContain("Das ist ein Absatz.")
    expect(result.slides[0].content).toContain("Das ist der zweite Absatz.")
  })
})

describe("parseMarkdown — Abschnittstrenner", () => {
  it("PAR-10: Sollte --- als Folienende erkennen (kein neuer Slide)", () => {
    const md = "# Titel\n\n## Folie 1\nInhalt\n\n---\n\n## Folie 2\nNoch mehr"
    const result = parseMarkdown(md)
    expect(result.slides).toHaveLength(2)
    expect(result.slides[0].title).toBe("Folie 1")
    expect(result.slides[1].title).toBe("Folie 2")
  })

  it("PAR-11: Sollte doppelter --- ignorieren", () => {
    const md = "# Titel\n\n## Folie 1\nInhalt\n\n---\n\n---\n\n## Folie 2\nText"
    const result = parseMarkdown(md)
    expect(result.slides).toHaveLength(2)
  })

  it("PAR-12: Sollte --- content der vorherigen Folie NICHT beeinflussen", () => {
    const md = "# Titel\n\n## Folie\nPunkt 1\n\n---\n\n## Nächste\nPunkt 2"
    const result = parseMarkdown(md)
    expect(result.slides[0].content).toContain("Punkt 1")
    expect(result.slides[1].content).toContain("Punkt 2")
  })
})

describe("parseMarkdown — Leerzeilen und Formatierung", () => {
  it("PAR-13: Sollte Leerzeilen ignorieren", () => {
    const md = "# Titel\n\n\n\n## Folie\n\n\nText\n\n\n"
    const result = parseMarkdown(md)
    expect(result.title).toBe("Titel")
    expect(result.slides).toHaveLength(1)
    expect(result.slides[0].content).toContain("Text")
  })

  it("PAR-14: Sollte **fett** und *kursiv* als content erfassen", () => {
    const md = "# Titel\n\n## Format\n**Fetter Text** und *kursiver Text*"
    const result = parseMarkdown(md)
    expect(result.slides[0].content).toContain("**Fetter Text** und *kursiver Text*")
  })
})

describe("parseMarkdown — Randfälle", () => {
  it("PAR-15: Sollte leere MD nur mit Titel verarbeiten", () => {
    const md = "# Titel"
    const result = parseMarkdown(md)
    expect(result.title).toBe("Titel")
    expect(result.slides).toHaveLength(0)
  })

  it("PAR-16: Sollte sehr lange Titel ohne Crash verarbeiten", () => {
    const longTitle = "# " + "A".repeat(200)
    const result = parseMarkdown(longTitle)
    expect(result.title).toHaveLength(200)
  })

  it("PAR-17: Sollte Sonderzeichen verarbeiten", () => {
    const md = "# Titel mit Umläuten: äöü\n\n## Inhalt\nEmojis: 😀🎉\nCJK: 日本語"
    const result = parseMarkdown(md)
    expect(result.title).toContain("äöü")
    expect(result.slides[0].content).toContain("Emojis: 😀🎉")
    expect(result.slides[0].content).toContain("CJK: 日本語")
  })

  it("PAR-18: Sollte # ohne Titeltext mit Warnung behandeln", () => {
    const md = "#\n\n## Inhalt\nText"
    const warnings: string[] = []
    const result = parseMarkdown(md, { onWarning: (w) => warnings.push(w) })
    expect(warnings.length).toBeGreaterThan(0)
    expect(result.slides).toHaveLength(1)
  })

  it("PAR-19: Sollte leere MD (nur Whitespace) sicher verarbeiten", () => {
    const md = "   \n\n  \n  "
    const result = parseMarkdown(md)
    expect(result.title).toBe("")
    expect(result.slides).toHaveLength(0)
  })

  it("PAR-20: Sollte gemischte Listen (geordnet + ungeordnet) korrekt erfassen", () => {
    const md = "# Titel\n\n## Gemischt\n- Erster Punkt\n1. Nummeriert\n- Zweiter Punkt\n2. Noch mehr"
    const result = parseMarkdown(md)
    expect(result.slides[0].content).toEqual([
      "Erster Punkt",
      "Nummeriert",
      "Zweiter Punkt",
      "Noch mehr",
    ])
  })
})

describe("parseMarkdown — Multi-Line Untertitel", () => {
  it("PAR-21: Sollte nur erste Zeile nach Titel als Untertitel erfassen (einzeilig)", () => {
    const md = "# Titel\nErste Zeile\nZweite Zeile\n\n## Folie\nInhalt"
    const result = parseMarkdown(md)
    expect(result.subtitle).toBe("Erste Zeile")
  })

  it("PAR-22: Sollte Leerzeile als Beendigung des Untertitels behandeln", () => {
    const md = "# Titel\nZeile eins\n\nZeile zwei\n\n## Folie\nText"
    const result = parseMarkdown(md)
    expect(result.subtitle).toBe("Zeile eins")
    // Zeile zwei landet im Slide-Content (currentSlide ist noch null)
    expect(result.slides).toHaveLength(1)
    expect(result.slides[0].title).toBe("Folie")
  })
})
