// shared types

export interface SlideConfig {
  title: string
  content: string[]
  layout?: SlideLayout
}

export type SlideLayout = "title" | "content" | "twoColumn" | "sectionHeader"

export interface GeneratorOptions {
  title: string
  slides: SlideConfig[]
  theme?: Partial<ThemeConfig>
}

export interface ThemeConfig {
  background: string
  fontColor: string
  accentColor: string
  titleFontSize: number
  contentFontSize: number
}

export interface AIGenerationConfig {
  provider: "anthropic"
  apiKey: string
  model?: string
  systemPrompt?: string
}

export interface GenerationResult {
  output: string
  slideCount: number
}
