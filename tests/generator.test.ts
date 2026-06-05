import { describe, expect, it } from "vitest"
import { generatePresentation } from "../src/generator"

describe("generatePresentation", () => {
  it("sollte eine Präsentation mit den richtigen Optionen zurückgeben", async () => {
    const result = await generatePresentation({
      title: "Test",
      slides: [{ title: "Folie 1", content: ["Zeile 1"] }],
    })

    expect(result.slideCount).toBe(1)
    expect(typeof result.output).toBe("string")
  })
})
