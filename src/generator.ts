import PptxGenJS from "pptxgenjs"
import type { GeneratorOptions, GenerationResult } from "./types"
import { DEFAULT_THEME } from "./config"

function createSlide(
  sheet: PptxGenJS.Slide,
  config: { theme: typeof DEFAULT_THEME }
): PptxGenJS.Slide {
  sheet.background = { color: config.theme.background }
  return sheet
}

export async function generatePresentation(
  options: GeneratorOptions
): Promise<GenerationResult> {
  const theme = { ...DEFAULT_THEME, ...options.theme }
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

  return { slideCount: options.slides.length, output: "" }
}

function addTitle(
  sheet: PptxGenJS.Slide,
  title: string,
  theme: typeof DEFAULT_THEME
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
  theme: typeof DEFAULT_THEME
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
