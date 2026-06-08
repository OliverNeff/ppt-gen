import { execSync } from "child_process"
import fs from "fs"
import os from "os"
import path from "path"
import { describe, expect, it, beforeEach, afterEach } from "vitest"

function runCli(args: string[]): string {
  const cliPath = path.join(__dirname, "..", "src", "cli.ts")
  const cmd = `npx tsx "${cliPath}" ${args.map((a) => `"${a}"`).join(" ")}`
  return execSync(cmd, {
    encoding: "utf-8",
    timeout: 15_000,
    env: { ...process.env, CI: "1" },
  })
}

function runCliFails(args: string[]): void {
  const cliPath = path.join(__dirname, "..", "src", "cli.ts")
  const cmd = `npx tsx "${cliPath}" ${args.map((a) => `"${a}"`).join(" ")}`
  expect(() =>
    execSync(cmd, {
      encoding: "utf-8",
      timeout: 15_000,
      env: { ...process.env, CI: "1" },
    }),
  ).toThrow()
}

/**
 * CLI-Tests: Exit-Codes, Fehlerbehandlung, Sonderpfade.
 * Testet die CLI als externen Prozess via execSync.
 * Exit-Codes werden durch Abwesenheit von Exceptions (0) bzw.
 * Vorhandensein von Exceptions (!= 0) verifiziert.
 */
describe("CLI — Exit-Codes und Fehlerbehandlung", () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ppt-gen-cli-"))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  /**
   * CLI-1: Kein Argument -> Exit-Code 1 (error output)
   */
  it("CLI-1: Kein Argument -> Exit-Code 1", () => {
    const cliPath = path.join(__dirname, "..", "src", "cli.ts")
    expect(() =>
      execSync(`npx tsx "${cliPath}"`, {
        encoding: "utf-8",
        timeout: 30_000,
        env: { ...process.env, CI: "1" },
      }),
    ).toThrow()
  })

  /**
   * CLI-2: Nicht existierende Datei -> Exit-Code 1
   */
  it("CLI-2: Nicht existierende Datei -> Exit-Code 1", () => {
    const nonexistent = path.join(tmpDir, "niemals.dae")
    runCliFails([nonexistent])
  })

  /**
   * CLI-3: Gultige MD -> Exit-Code 0 und Ausgabe
   */
  it("CLI-3: Gultige MD -> Exit-Code 0 und Ausgabe", () => {
    const mdFile = path.join(tmpDir, "test.md")
    fs.writeFileSync(mdFile, "# Nur Titel")
    const output = runCli([mdFile])
    expect(output).toContain("Prasentation generiert")
  })
})

describe("CLI — Pfad-Sonderfaelle", () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ppt-gen-cli-spaces-"))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  /**
   * CLI-4: Pfad mit Leerzeichen -> Exit-Code 0
   */
  it("CLI-4: Pfad mit Leerzeichen -> Ausgabe ohne Fehler", () => {
    const spacedDir = path.join(tmpDir, "mein dokument")
    fs.mkdirSync(spacedDir, { recursive: true })
    const inputPath = path.join(spacedDir, "test.md")
    fs.writeFileSync(inputPath, "# Test\n## Folie\nInhalt")

    const output = runCli([inputPath])
    expect(output).toContain("Prasentation generiert")
  })

  /**
   * CLI-5: Erfolgreiche Generierung mit mehreren Folien -> Exit-Code 0
   */
  it("CLI-5: Mehrere Folien -> Ausgabe mit Slide-Anzahl", () => {
    const mdContent = `# Projekt Status

## Folie 1
Punkt A
Punkt B

## Folie 2
Noch mehr Inhalt
`
    const mdFile = path.join(tmpDir, "multi.md")
    fs.writeFileSync(mdFile, mdContent)

    const output = runCli([mdFile])
    expect(output).toContain("Prasentation generiert")
    expect(output).toMatch(/\d+ Folien/)
  })
})
