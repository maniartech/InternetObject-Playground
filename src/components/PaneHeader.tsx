import { type ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { MONO, useTokens } from '../theme/muiTheme';

interface Props {
  label: string;
  /** Byte count chip; omitted when undefined. */
  bytes?: number;
  /** Comparison badge text, e.g. "45.45% Smaller than JSON". */
  badge?: string;
  title?: string;
  /** Right-aligned actions (e.g. output toggles). */
  children?: ReactNode;
}

export function PaneHeader({ label, bytes, badge, title, children }: Props) {
  const t = useTokens();
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      title={title}
      sx={{
        px: 1.5,
        py: 0.75,
        flex: 'none',
        minHeight: 34,
        bgcolor: t.surface2,
        borderBottom: `1px solid ${t.borderSoft}`,
      }}
    >
      <Typography
        sx={{
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: t.inkDim,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>

      {bytes !== undefined && bytes > 0 && (
        <Box
          component="span"
          title={`${bytes} bytes in ${label}`}
          sx={{
            fontFamily: MONO,
            fontSize: 10.5,
            color: t.inkFaint,
            bgcolor: t.surface3,
            border: `1px solid ${t.borderSoft}`,
            borderRadius: '5px',
            px: 0.75,
            py: '1px',
          }}
        >
          {bytes} B
        </Box>
      )}

      {badge && (
        <Box
          component="span"
          sx={{
            fontFamily: MONO,
            fontSize: 10.5,
            fontWeight: 600,
            color: t.accentBright,
            bgcolor: t.accentSoft,
            borderRadius: '5px',
            px: 0.75,
            py: '1px',
            whiteSpace: 'nowrap',
          }}
        >
          {badge}
        </Box>
      )}

      <Box sx={{ flex: 1 }} />
      {children}
    </Stack>
  );
}

/** Shared "% Smaller/Larger than JSON" text — matches the original Bar logic. */
export function comparisonBadge(bytes: number, outputBytes: number, minified: boolean, isError?: boolean): string | undefined {
  if (!bytes || isError || !outputBytes) return undefined;
  const perc = 100 - (bytes / outputBytes) * 100;
  const label = perc > 0 ? `${perc.toFixed(2)}% Smaller` : `${Math.abs(perc).toFixed(2)}% Larger`;
  return `${label} than ${minified ? 'minified ' : ''}JSON`;
}
