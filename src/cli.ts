import fs from "fs"
import path from "path"
import { generatePresentation } from "./generator"
import { parseMarkdown } from "./parser"

/**
 * CLI-Einstiegspunkt: Liest eine MD-Datei, parst sie und erzeugt eine PPTX.
 * Ausgabe liegt im gleichen Verzeichnis wie die Eingabedatei.
 */
export async function main(): Promise<void> {
  const args = process.argv.slice(2)

  if (args.length < 1) {
    console.error("Verwendung: ppt-gen <input.md>")
    process.exit(1)
  }

  const inputPath = args[0]

  // Eingabedatei lesen
  let mdContent: string
  try {
    mdContent = fs.readFileSync(inputPath, "utf-8")
  } catch {
    console.error(`Fehler: Eingabedatei nicht gefunden — ${inputPath}`)
    process.exit(1)
  }

  // Markdown parsen
  const parsed = parseMarkdown(mdContent)

  // Output-Pfad neben der Eingabedatei
  const inputDir = path.dirname(inputPath)
  const baseName = path.basename(inputPath, path.extname(inputPath))
  const outputPath = path.join(inputDir, `${baseName}.pptx`)

  // Präsentation generieren
  try {
    const result = await generatePresentation({
      title: parsed.title,
      slides: parsed.slides,
      outputPath,
    })
    console.log(`Prasentation generiert: ${result.output} (${result.slideCount} Folien)`)
  } catch {
    console.error("Fehler: Prasentation konnte nicht generiert werden")
    process.exit(2)
  }
}

main().catch(() => {
  process.exit(1)
})
