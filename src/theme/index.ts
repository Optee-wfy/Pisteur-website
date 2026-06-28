import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6eaff" },
          100: { value: "#b3bcff" },
          200: { value: "#808eff" },
          300: { value: "#4d61ff" },
          400: { value: "#323878" },
          500: { value: "#000d4d" },
          600: { value: "#000b3d" },
          700: { value: "#00082e" },
          800: { value: "#00061f" },
          900: { value: "#000310" },
          950: { value: "#000208" },
        },
        accent: {
          50: { value: "#eafbea" },
          100: { value: "#c5f5c5" },
          200: { value: "#7ae97a" },
          300: { value: "#4ae04a" },
          400: { value: "#23c55e" },
          500: { value: "#1da34e" },
          600: { value: "#17833f" },
          700: { value: "#116330" },
          800: { value: "#0b4320" },
          900: { value: "#062210" },
          950: { value: "#031108" },
        },
        highlight: {
          50: { value: "#fff5ed" },
          100: { value: "#ffe4cc" },
          200: { value: "#ffc999" },
          300: { value: "#ffad66" },
          400: { value: "#ff8a3d" },
          500: { value: "#e67530" },
          600: { value: "#cc6024" },
          700: { value: "#994818" },
          800: { value: "#66300c" },
          900: { value: "#331806" },
          950: { value: "#1a0c03" },
        },
      },
      fonts: {
        heading: { value: "'Inter', system-ui, sans-serif" },
        body: { value: "'Inter', system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "#ffffff" },
          fg: { value: "{colors.brand.500}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.50}" },
          emphasized: { value: "{colors.brand.400}" },
          focusRing: { value: "{colors.brand.500}" },
        },
        accent: {
          solid: { value: "{colors.accent.400}" },
          contrast: { value: "#ffffff" },
          fg: { value: "{colors.accent.400}" },
          muted: { value: "{colors.accent.100}" },
          subtle: { value: "{colors.accent.50}" },
          emphasized: { value: "{colors.accent.300}" },
          focusRing: { value: "{colors.accent.400}" },
        },
      },
    },
  },
  globalCss: {
    html: {
      scrollBehavior: "smooth",
    },
    body: {
      bg: "#ffffff",
      color: "{colors.brand.500}",
    },
  },
})

export const system = createSystem(defaultConfig, config)
