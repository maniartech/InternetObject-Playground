import { Box, Stack } from '@mui/material';
import { MONO, useTokens } from '../theme/muiTheme';
import type { CursorState } from '../types/cursor';

export function StatusBar({ cursor }: { cursor: CursorState }) {
  const t = useTokens();
  const year = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 1.75,
        height: 26,
        overflow: 'hidden',
        bgcolor: 'transparent',
        fontFamily: MONO,
        fontSize: 11,
        color: t.inkFaint,
      }}
    >
      {/* Cursor position — hidden on narrow screens to avoid colliding with the credit. */}
      <Stack direction="row" spacing={1.5} sx={{ display: { xs: 'none', sm: 'flex' }, minWidth: 0, overflow: 'hidden' }}>
        {cursor.editorName && <Box component="span" sx={{ color: t.inkDim, whiteSpace: 'nowrap' }}>{cursor.editorName}</Box>}
        <span>Ln {cursor.row}</span>
        <span>Col {cursor.column}</span>
        <span>Pos {cursor.position}</span>
      </Stack>
      <Box sx={{ flex: 1 }} />
      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, whiteSpace: 'nowrap', flexShrink: 0 }}>
        © 2019–{year}
        <Box component="img" src="/mt-logo.png" alt="" sx={{ width: 16, height: 16, opacity: 0.85 }} />
        <Box
          component="a"
          href="https://www.maniartech.com"
          target="_blank"
          rel="noreferrer"
          sx={{ color: t.inkDim, textDecoration: 'none', fontWeight: 600, '&:hover': { color: t.accent, textDecoration: 'underline' } }}
        >
          Maniar Technologies
        </Box>
      </Box>
    </Box>
  );
}
