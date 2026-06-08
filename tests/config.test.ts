import { describe, expect, it } from "vitest"
import { DEFAULT_THEME } from "../src/config"
import type { ThemeConfig } from "../src/types"

describe("DEFAULT_THEME — Config Tests (UT-2.x)", () => {
  it("UT-2.1: background Wert ist FFFFFFF", () => {
    expect(DEFAULT_THEME.background).toBe("FFFFFF")
  })

  it("UT-2.2: fontColor Wert ist 1F2937", () => {
    expect(DEFAULT_THEME.fontColor).toBe("1F2937")
  })

  it("UT-2.3: accentColor Wert ist 2563EB", () => {
    expect(DEFAULT_THEME.accentColor).toBe("2563EB")
  })

  it("UT-2.4: titleFontSize Wert ist 36", () => {
    expect(DEFAULT_THEME.titleFontSize).toBe(36)
  })

  it("UT-2.5: contentFontSize Wert ist 18", () => {
    expect(DEFAULT_THEME.contentFontSize).toBe(18)
  })

  it("UT-2.6: Alle 5 Felder vorhanden", () => {
    const keys = Object.keys(DEFAULT_THEME)
    expect(keys).toContain("background")
    expect(keys).toContain("fontColor")
    expect(keys).toContain("accentColor")
    expect(keys).toContain("titleFontSize")
    expect(keys).toContain("contentFontSize")
  })
})
