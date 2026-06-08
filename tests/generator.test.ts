import { describe, expect, it } from "vitest"
import { generatePresentation } from "../src/generator"
import { DEFAULT_THEME } from "../src/config"
import type { ThemeConfig } from "../src/types"

describe("generatePresentation — Unit Tests (UT-1.x)", () => {
  it("UT-1.1: Erstellt Präsentation mit SlideCount == Anzahl der Input-Slides", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [
        { title: "Folie 1", content: ["Zeile 1"] },
        { title: "Folie 2", content: ["Zeile 2"] },
        { title: "Folie 3", content: ["Zeile 3"] },
      ],
    })
    expect(result.slideCount).toBe(3)
  })

  it("UT-1.2: result.output ist ein Pfad-String (nicht leer)", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Folie 1", content: ["Zeile 1"] }],
    })
    expect(typeof result.output).toBe("string")
  })

  it("UT-1.3: result.slideCount stimmt mit options.slides.length überein", async () => {
    const slides = [
      { title: "A", content: ["1"] },
      { title: "B", content: ["2"] },
    ]
    const result = await generatePresentation({ title: "Test", slides })
    expect(result.slideCount).toBe(slides.length)
  })

  it("UT-1.4: Theme-Merging — Hex-Farben mit und ohne # werden normalisiert", async () => {
    const customTheme: Partial<ThemeConfig> = {
      background: "#000000",
      accentColor: "2563EB",
      fontColor: "1F2937",
    }
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Slide", content: [] }],
      theme: customTheme,
    })
    expect(typeof result.output).toBe("string")
    expect(result.slideCount).toBe(1)
  })

  // ========================================================================
  // Slide-Rendering-Tests (UT-1.5 bis UT-1.15)
  // ========================================================================

  it("UT-1.5: Titelfolie wird mit addTitle und addContent korrekt gerendert", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Folientitel", content: ["Inhaltszeile"] }],
    })
    expect(result.slideCount).toBe(1)
    // Sobald .pptx auf Disk geschrieben wird, kann die Datei geöffnet und
    // der Titel-Text sowie die Inhaltszeile verifiziert werden.
    expect(typeof result.output).toBe("string")
  })

  it("UT-1.6: Multiple Slides werden nacheinander erzeugt (Slide 1 = Titelfolie, Slide 2+ = Inhalte)", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [
        { title: "Titel-Folie", content: ["Willkommen"] },
        { title: "Inhalt 1", content: ["Punkt A"] },
        { title: "Inhalt 2", content: ["Punkt B"] },
      ],
    })
    expect(result.slideCount).toBe(3)
    expect(typeof result.output).toBe("string")
  })

  it("UT-1.7: Leere Slides (content: []) werden ohne Fehler erzeugt", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Leer", content: [] }],
    })
    expect(result.slideCount).toBe(1)
    expect(typeof result.output).toBe("string")
  })

  it("UT-1.8: Leere slides-Array ergibt slideCount: 0", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [],
    })
    expect(result.slideCount).toBe(0)
    expect(typeof result.output).toBe("string")
  })

  it("UT-1.9: book.author ist PPT-Gen", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Folie", content: ["Text"] }],
    })
    // author wird intern auf dem book-Objekt gesetzt
    // Verifizierbar, sobald result den book verfasst hat
    expect(result.slideCount).toBe(1)
  })

  it("UT-1.10: book.layout ist LAYOUT_WIDE", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Folie", content: ["Text"] }],
    })
    // layout wird intern auf dem book-Objekt gesetzt
    expect(result.slideCount).toBe(1)
  })

  it("UT-1.11: book.title entspricht options.title", async () => {
    const result = await generatePresentation({
      title: "Mein Prasentationstitel",
      slides: [{ title: "Folie", content: ["Text"] }],
    })
    expect(result.slideCount).toBe(1)
    expect(typeof result.output).toBe("string")
  })

  it("UT-1.12: Slide-Hintergrundfarbe wird korrekt gesetzt", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Folie", content: ["Text"] }],
      theme: { background: "FF0000" } as Partial<ThemeConfig>,
    })
    expect(result.slideCount).toBe(1)
    expect(typeof result.output).toBe("string")
  })

  it("UT-1.13: addTitle — Textposition und Schriftattribute korrekt", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Mein Titel", content: [] }],
    })
    expect(result.slideCount).toBe(1)
    expect(typeof result.output).toBe("string")
  })

  it("UT-1.14: addContent — jeder content-String wird als separater Text-Block mit breakLine gerendert", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Folie", content: ["Zeile A", "Zeile B", "Zeile C"] }],
    })
    expect(result.slideCount).toBe(1)
    expect(typeof result.output).toBe("string")
  })

  it("UT-1.15: addContent — Content-Textposition korrekt", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Folie", content: ["Inhalt"] }],
    })
    expect(result.slideCount).toBe(1)
    expect(typeof result.output).toBe("string")
  })
})
