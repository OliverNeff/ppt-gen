import fs from "fs"
import path from "path"
import PptxGenJS from "pptxgenjs"
import type { GeneratorOptions, GenerationResult, ThemeConfig } from "./types"
import { DEFAULT_THEME } from "./config"

/**
 * Normalizes a hex color string to always include the `#` prefix.
 * pptxgenjs requires colors like `#FFF` or `#FFFFFF`, never bare `FFF`.
 */
function normalizeHex(color: string): string {
  const cleaned = color.replace(/^#/, "")
  return `#${cleaned}`
}

const OUTPUT_DIR = path.join(process.cwd(), "output")

/**
 * Removes characters that are invalid in file paths and control characters.
 * The range \x00-\x1f is intentionally kept — ESLint's no-control-regex is disabled for this line.
 */
export function sanitizeFilename(name: string): string {
  // eslint-disable-next-line no-control-regex
  return name.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").slice(0, 100)
}

function createSlide(
  sheet: PptxGenJS.Slide,
  config: { theme: ThemeConfig }
): PptxGenJS.Slide {
  sheet.background = { color: config.theme.background }
  return sheet
}

export async function generatePresentation(
  options: GeneratorOptions
): Promise<GenerationResult> {
  const merged = { ...DEFAULT_THEME, ...options.theme }
  const theme: ThemeConfig = {
    ...merged,
    background: normalizeHex(merged.background),
    fontColor: normalizeHex(merged.fontColor),
    accentColor: normalizeHex(merged.accentColor),
  }
  const book = new PptxGenJS()

  book.layout = "LAYOUT_WIDE"
  book.author = "PPT-Gen"
  book.title = options.title

  for (const slide of options.slides) {
    const sheet = book.addSlide()
    createSlide(sheet, { theme })
    addTitle(sheet, slide.title, theme)
    addContent(sheet, slide.content, theme)
  }

  // PPTX-Datei auf Disk schreiben
  const outputPath = options.outputPath ?? path.join(OUTPUT_DIR, `${sanitizeFilename(options.title)}.pptx`)
  const outputDir = path.dirname(outputPath)
  fs.mkdirSync(outputDir, { recursive: true })
  await book.writeFile({ fileName: outputPath })

  return { slideCount: options.slides.length, output: outputPath }
}

function addTitle(
  sheet: PptxGenJS.Slide,
  title: string,
  theme: ThemeConfig
): void {
  sheet.addText(title, {
    x: 0.8,
    y: 0.4,
    w: 9.4,
    fontSize: theme.titleFontSize,
    color: theme.accentColor,
    bold: true,
    fontFace: "Calibri",
  })
}

function addContent(
  sheet: PptxGenJS.Slide,
  lines: string[],
  theme: ThemeConfig
): void {
  const body = lines.map((line) => ({
    text: line,
    fontSize: theme.contentFontSize,
    color: theme.fontColor,
    fontFace: "Calibri",
    breakLine: true,
  }))

  sheet.addText(body, { x: 0.8, y: 2.0, w: 9.4, h: 5.0 })
}
