import { createContext, useContext } from 'react';
import { createTheme, type Theme } from '@mui/material/styles';

export type Mode = 'dark' | 'light';

/**
 * Design tokens — the single colour source for the whole app.
 * Both the MUI theme and the Monaco editor themes are derived from these,
 * so there is exactly one place to change a colour.
 */
export interface Tokens {
  bg: string;
  surface: string;
  surface2: string;
  surface3: string;
  border: string;
  borderSoft: string;
  ink: string;
  inkDim: string;
  inkFaint: string;
  accent: string;
  accentBright: string;
  accentSoft: string;
  green: string;
  red: string;
  amber: string;
  /** Monaco editor canvas background + gutter */
  editorBg: string;
  editorGutter: string;
  // syntax colours (fed to the Monaco "io" themes)
  synKw: string;
  synStr: string;
  synAttr: string;
  synTag: string;
  synDelim: string;
  synNum: string;
  synCom: string;
}

export const palette: Record<Mode, Tokens> = {
  dark: {
    bg: '#0d1117',
    surface: '#161b22',
    surface2: '#1b2129',
    surface3: '#11151b',
    border: '#2a313c',
    borderSoft: '#20262f',
    ink: '#e6edf3',
    inkDim: '#9aa5b1',
    // 4.95:1 on the darkest surface it lands on (#1b2129) — WCAG AA needs 4.5:1. The old #6b7482
    // measured 3.43:1, failing on every surface. Do not darken this without re-checking contrast.
    inkFaint: '#858f9e',
    accent: '#3b9dff',
    accentBright: '#69b7ff',
    accentSoft: 'rgba(59,157,255,0.15)',
    green: '#3fb950',
    red: '#ff6b72',
    amber: '#d9a441',
    editorBg: '#0f141a',
    editorGutter: '#0f141a',
    synKw: '#5cc8ff',
    synStr: '#c9a36b',
    synAttr: '#9db4ff',
    synTag: '#7fd1c4',
    synDelim: '#4db6ac',
    synNum: '#e0a458',
    synCom: '#6b7482',
  },
  light: {
    bg: '#f3f5f8',
    surface: '#ffffff',
    surface2: '#f5f7fa',
    surface3: '#eceff3',
    border: '#d8dee6',
    borderSoft: '#e6eaf0',
    ink: '#1a2029',
    inkDim: '#55606d',
    // 4.61:1 on white — the old #8a94a1 was 2.67:1, well below the 4.5:1 AA floor.
    inkFaint: '#626c7a',
    accent: '#0071d1',
    accentBright: '#005bab',
    accentSoft: 'rgba(0,113,209,0.10)',
    green: '#1a8a3f',
    red: '#d13a45',
    amber: '#9a6a12',
    editorBg: '#ffffff',
    editorGutter: '#ffffff',
    synKw: '#0a63b8',
    synStr: '#9a6a12',
    synAttr: '#3a54a8',
    synTag: '#0a7d70',
    synDelim: '#0a8079',
    synNum: '#a15a1e',
    synCom: '#8a94a1',
  },
};

export const MONO =
  'ui-monospace, "JetBrains Mono", "SF Mono", "Cascadia Code", "Fira Code", Menlo, Consolas, monospace';
export const SANS =
  '"Inter Variable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export function makeTheme(mode: Mode): Theme {
  const t = palette[mode];
  return createTheme({
    palette: {
      mode,
      background: { default: t.bg, paper: t.surface },
      primary: { main: t.accent, contrastText: mode === 'dark' ? '#04121f' : '#ffffff' },
      text: { primary: t.ink, secondary: t.inkDim },
      divider: t.border,
      success: { main: t.green },
      error: { main: t.red },
      warning: { main: t.amber },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: SANS,
      fontSize: 13.5,
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html, body, #root': { height: '100%', margin: 0 },
          body: { backgroundColor: t.bg, overflow: 'hidden' },
          '*': {
            boxSizing: 'border-box',
            scrollbarWidth: 'thin',
            scrollbarColor: `${t.border} transparent`,
          },
          '*::-webkit-scrollbar': { width: '10px', height: '10px' },
          '*::-webkit-scrollbar-track': { background: 'transparent' },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: t.border,
            borderRadius: '8px',
            border: `2px solid ${t.surface3}`,
          },
          '*::-webkit-scrollbar-thumb:hover': { backgroundColor: t.inkFaint },
          '*::-webkit-scrollbar-corner': { background: 'transparent' },
        },
      },
      MuiTooltip: {
        defaultProps: { arrow: true },
        styleOverrides: {
          tooltip: { fontSize: 11.5, backgroundColor: t.surface3, color: t.ink, border: `1px solid ${t.border}` },
          arrow: { color: t.surface3 },
        },
      },
    },
  });
}

/** Tokens for the current mode, provided by App. */
export const TokensContext = createContext<Tokens>(palette.dark);
export const useTokens = () => useContext(TokensContext);

export const STORAGE_MODE_KEY = 'io-playground-theme';
