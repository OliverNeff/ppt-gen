import fs from "fs"
import os from "os"
import path from "path"
import { describe, expect, it, beforeEach, afterEach } from "vitest"
import { generatePresentation } from "../src/generator"
import { parseMarkdown } from "../src/parser"

/**
 * E2E-Tests: MD -> Parser -> Generator -> Disk
 */
describe("E2E — MD zu PPTX Pipeline", () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ppt-gen-e2e-"))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  /**
   * E2E-1: Komplette Pipeline — MD-String erzeugt PPTX auf Disk
   */
  it("E2E-1: Parse Markdown und generiere PPTX — Datei existiert auf Disk", async () => {
    const md = `# Meine Prasentation

## Folie 1
Erster Punkt
Zweiter Punkt

## Folie 2
Noch ein Punkt
`

    const parsed = parseMarkdown(md)
    const filePath = path.join(tmpDir, "test.pptx")

    const result = await generatePresentation({
      title: parsed.title,
      slides: parsed.slides,
      outputPath: filePath,
    })

    expect(result.slideCount).toBe(2)
    expect(fs.existsSync(filePath)).toBe(true)
  })

  /**
   * E2E-2: Output liegt neben der Eingabedatei (nicht in output/)
   */
  it("E2E-2: Output-Pfad ist neben der Input-Datei", async () => {
    const md = `# Test
## Inhalt
Punkt eins
`

    const inputPath = path.join(tmpDir, "input.md")
    const expectedOutput = path.join(tmpDir, "input.pptx")

    fs.writeFileSync(inputPath, md)
    const parsed = parseMarkdown(md)

    const result = await generatePresentation({
      title: parsed.title,
      slides: parsed.slides,
      outputPath: expectedOutput,
    })

    expect(result.output).toBe(expectedOutput)
    expect(fs.existsSync(expectedOutput)).toBe(true)
  })

  /**
   * E2E-3: Leere Slides (content: []) werden ohne Fehler erzeugt
   */
  it("E2E-3: Leere Slides werden erfolgreich generiert", async () => {
    const md = `# Titel
## Leere Folie
`

    const parsed = parseMarkdown(md)
    const filePath = path.join(tmpDir, "empty.pptx")

    const result = await generatePresentation({
      title: parsed.title,
      slides: parsed.slides,
      outputPath: filePath,
    })

    expect(result.slideCount).toBe(1)
    expect(fs.existsSync(filePath)).toBe(true)
  })

  /**
   * E2E-4: Mehrere Slides mit unterschiedlichen Themes
   */
  it("E2E-4: Multi-Slide mit custom Theme — alle Slides gerendert", async () => {
    const md = `# Demo
## Slide 1
Inhalt 1

## Slide 2
Inhalt 2

## Slide 3
Inhalt 3
`

    const parsed = parseMarkdown(md)
    const filePath = path.join(tmpDir, "theme-test.pptx")

    const result = await generatePresentation({
      title: parsed.title,
      slides: parsed.slides,
      outputPath: filePath,
      theme: { background: "#000000", accentColor: "FF0000", fontColor: "FFFFFF" },
    })

    expect(result.slideCount).toBe(3)
    expect(fs.existsSync(filePath)).toBe(true)
  })

  /**
   * E2E-5: Parser erkennt Titelfolie und Untertitel
   */
  it("E2E-5: Parser — title und subtitle korrekt extrahiert", () => {
    const md = `# Haupttitel
Untertitel Beschreibung

## Folie 1
Inhalt
`

    const result = parseMarkdown(md)
    expect(result.title).toBe("Haupttitel")
    expect(result.subtitle).toBe("Untertitel Beschreibung")
    expect(result.slides.length).toBe(1)
  })

  /**
   * E2E-6: Parser — Aufzahlungslisten korrekt erkannt
   */
  it("E2E-6: Parser — Bindestrich-Listen werden als content recognized", () => {
    const md = `# Titel
## Folie
- Punkt A
- Punkt B
- Punkt C
`

    const result = parseMarkdown(md)
    expect(result.slides[0].content).toEqual(["Punkt A", "Punkt B", "Punkt C"])
  })

  /**
   * E2E-7: Parser — Nummerierte Listen werden korrekt erkannt
   */
  it("E2E-7: Parser — Nummerierte Listen werden als content recognized", () => {
    const md = `# Titel
## Folie
1. Erster
2. Zweiter
3. Dritter
`

    const result = parseMarkdown(md)
    expect(result.slides[0].content).toEqual(["Erster", "Zweiter", "Dritter"])
  })

  /**
   * E2E-8: Parser — Section Separator (---) stoppt aktuellen Slide-Content
   */
  it("E2E-8: Parser — Section Separator wirkt auf Content", () => {
    const md = `# Titel
## Folie 1
Inhalt A

---

Inhalt B
`

    const result = parseMarkdown(md)
    // Inhalt A und B sollten beide im gleichen Slide sein (Separator beendet nicht den Slide)
    expect(result.slides.length).toBe(1)
  })

  /**
   * E2E-9: PPTX-Datei ist valide (mindestens die ZIP-Struktur hat)
   */
  it("E2E-9: Generierte PPTX ist eine gueltige ZIP-Datei", async () => {
    const md = `# Validity Test
## Test
Inhalt
`

    const parsed = parseMarkdown(md)
    const filePath = path.join(tmpDir, "valid.pptx")

    await generatePresentation({
      title: parsed.title,
      slides: parsed.slides,
      outputPath: filePath,
    })

    // .pptx = ZIP-Datei — pruefe Magic Bytes
    const buf = fs.readFileSync(filePath)
    expect(buf.slice(0, 4)).toEqual(Buffer.from([0x50, 0x4b, 0x03, 0x04]))
  })

  /**
   * E2E-10: Parser — ### Unterueberschrift auf Slide
   */
  it("E2E-10: Parser — ### Unterueberschrift wird auf Slide gespeichert", () => {
    const md = `# Titel
## Slide
### Untertitel
Inhalt
`

    const result = parseMarkdown(md)
    expect(result.slides[0].subtitle).toBe("Untertitel")
  })

  /**
   * E2E-11: Parser — leere md ohne ## ergibt keine Slides
   */
  it("E2E-11: Parser — Nur Titel ohne ## ergibt slideCount 0", () => {
    const md = `# Nur Titel
`

    const result = parseMarkdown(md)
    expect(result.title).toBe("Nur Titel")
    expect(result.slides.length).toBe(0)
  })

  /**
   * E2E-12: Komplette Pipeline mit Titel- und Content-Slide
   */
  it("E2E-12: Vollstaendige Pipeline — Titel + Content Slide", async () => {
    const md = `# Projekt Status
Q2 2026 Report

## Ziele
- Ziel A erreicht
- Ziel B offen

## Naechste Schritte
1. Review durchführen
2. Feedback einholen
`

    const parsed = parseMarkdown(md)
    const filePath = path.join(tmpDir, "full-pipeline.pptx")

    const result = await generatePresentation({
      title: parsed.title,
      slides: parsed.slides,
      outputPath: filePath,
    })

    expect(parsed.title).toBe("Projekt Status")
    expect(parsed.slides.length).toBe(2)
    expect(result.slideCount).toBe(2)
    expect(fs.existsSync(filePath)).toBe(true)
  })
})
