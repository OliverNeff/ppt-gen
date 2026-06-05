# PPT-Gen

PowerPoint-Generator mit AI-Unterstützung (TypeScript).

## Schnellstart

```bash
npm install
npm run build
npm start
```

## API

```typescript
import { generatePresentation } from "ppt-gen"

const result = await generatePresentation({
  title: "Meine Präsentation",
  slides: [
    {
      title: "Titel-Folie",
      content: ["Willkommen!", "Dies ist eine Beispiel-Präsentation."],
    },
  ],
})
```

## Struktur

| Datei          | Zweck                        |
| -------------- | ---------------------------- |
| `src/generator.ts` | Kern-Logik               |
| `src/types.ts`   | Shared Types             |
| `src/config.ts`  | Standardeinstellungen    |
| `src/cli.ts`     | CLI-Beispiel             |
