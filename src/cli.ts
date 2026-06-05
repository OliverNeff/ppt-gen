import { generatePresentation } from "./generator"

const options: Parameters<typeof generatePresentation>[0] = {
  title: "Beispiel Presentation",
  slides: [
    {
      title: "Titel-Folie",
      content: ["Willkommen zur Präsentation.", "Dies ist ein Beispiel."],
    },
    {
      title: "Inhalt",
      content: ["Punkt eins", "Punkt zwei", "Punkt drei"],
    },
  ],
}

async function main(): Promise<void> {
  const result = await generatePresentation(options)
  console.log(`Präsentation generiert mit ${result.slideCount} Folien.`)
}

main().catch(console.error)
