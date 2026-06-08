import type { SlideConfig } from "./types"

export interface ParseOptions {
  onWarning?: (warning: string) => void
}

export interface ParseResult {
  title: string
  subtitle?: string
  slides: SlideConfig[]
}

/**
 * Parses a Markdown string into a structured presentation format.
 *
 * Convention:
 * - `# Titel` -> title slide (slide 0, accessed via `result.title`)
 * - Optional subtitle: first non-empty line after `#` without `##` prefix
 * - `## Überschrift` -> new slide
 * - `### Unterüberschrift` -> subtitle on the current slide
 * - `- Listenpunkt` / `1. Nummeriert` -> list item (content)
 * - Plain text line -> paragraph (content)
 * - `---` -> section separator (ends current slide content, no new slide)
 * - Empty lines are ignored
 */
export function parseMarkdown(md: string, options: ParseOptions = {}): ParseResult {
  const warnings: string[] = []
  const lines = md.split("\n")
  const result: ParseResult = { title: "", subtitle: undefined, slides: [] }

  let currentSlide: SlideConfig | null = null
  let parsingSubtitle = false
  let subtitleLine = ""
  let foundTitle = false

  // First pass: validate structure
  let foundFirstH1 = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("##")) {
      if (!foundFirstH1) {
        warnings.push("semantischer Fehler: ## vor # gefunden — Titel wird automatisch eingefügt")
        result.title = "Titel"
        foundFirstH1 = true
        break
      }
    }
    if (trimmed.startsWith("#") && !trimmed.startsWith("##") && !foundFirstH1) {
      foundFirstH1 = true
    }
  }

  // Second pass: parse content
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // Skip empty lines
    if (trimmed === "") {
      i++
      continue
    }

    // Section separator
    if (trimmed === "---") {
      i++
      continue
    }

    // Title slide: # Titel
    if (trimmed.startsWith("#") && !trimmed.startsWith("##") && !foundTitle) {
      const titleText = trimmed.slice(1).trim()
      if (titleText === "") {
        warnings.push("Warnung: # ohne Titeltext — leere Titelfolie wird erzeugt")
        result.title = ""
      } else {
        result.title = titleText
      }
      foundTitle = true
      parsingSubtitle = true
      subtitleLine = ""
      i++
      continue
    }

    // Collect subtitle (first non-empty, non-## line after #)
    if (parsingSubtitle && !trimmed.startsWith("##") && !trimmed.startsWith("###")) {
      if (subtitleLine === "") {
        subtitleLine = trimmed
      }
      i++
      continue
    }

    // End subtitle collection when we hit ## or ###
    if (parsingSubtitle && (trimmed.startsWith("##") || trimmed.startsWith("#") && trimmed.startsWith("###"))) {
      parsingSubtitle = false
      if (subtitleLine !== "") {
        result.subtitle = subtitleLine
      }
    }

    // New slide: ## Überschrift
    if (trimmed.startsWith("##") && !trimmed.startsWith("###")) {
      const slideTitle = trimmed.slice(2).trim()
      currentSlide = { title: slideTitle, content: [] }
      result.slides.push(currentSlide)
      // section separator handled above
      i++
      continue
    }

    // Subtitle on current slide: ### Unterüberschrift
    if (trimmed.startsWith("###")) {
      if (currentSlide) {
        currentSlide.subtitle = trimmed.slice(3).trim()
      }
      i++
      continue
    }

    // List item: - or 1.
    if (trimmed.startsWith("- ") || trimmed.startsWith("-\t")) {
      if (currentSlide) {
        currentSlide.content.push(trimmed.slice(2).trim())
      }
      // section separator handled above
      i++
      continue
    }

    // Numbered list: 1.
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^\d+\.\s+(.*)/)
      if (match && currentSlide) {
        currentSlide.content.push(match[1])
      }
      // section separator handled above
      i++
      continue
    }

    // Paragraph text
    if (currentSlide) {
      currentSlide.content.push(trimmed)
    } else if (foundTitle) {
      // Text before any ## — skip (part of title area)
    }

    i++
  }

  // Finalize subtitle if still collecting
  if (parsingSubtitle && subtitleLine !== "") {
    result.subtitle = subtitleLine
  }

  // Apply warnings if needed
  for (const w of warnings) {
    if (options.onWarning) {
      options.onWarning(w)
    }
  }

  return result
}
