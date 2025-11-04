/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  // Add custom env variables here if needed
  // readonly VITE_CUSTOM_VAR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
