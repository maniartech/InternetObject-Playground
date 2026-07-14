import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { EditorPane } from './EditorPane';
import { ProblemList } from './ProblemList';
import { generateJsonErrorDecorations } from '../utils/jsonDecorations';
import { MONO, useTokens } from '../theme/muiTheme';
import type { ErrorItem } from '../types/errors';

interface Props {
  value: string;
  error: boolean;
  errorItems: ErrorItem[];
  monacoTheme: string;
  onNavigateToError?: (item: ErrorItem) => void;
  header?: ReactNode;
  bare?: boolean;
  /** Suppress the in-pane problems overlay (mobile shows problems in a bottom drawer). */
  hideOverlay?: boolean;
}

export function OutputPane({ value, error, errorItems, monacoTheme, onNavigateToError, header, bare, hideOverlay }: Props) {
  const t = useTokens();
  const [dismissed, setDismissed] = useState(false);
  const [lastErrorKey, setLastErrorKey] = useState('');

  // Re-show the overlay only when the set of errors actually changes.
  useEffect(() => {
    const key = errorItems.map((e) => e.id).join('|');
    if (key !== lastErrorKey) {
      setLastErrorKey(key);
      if (key) setDismissed(false);
    }
  }, [errorItems, lastErrorKey]);

  const decorations = useMemo(() => generateJsonErrorDecorations(value || ''), [value]);

  const showOverlay = !hideOverlay && error && errorItems.length > 0 && !dismissed;

  return (
    <Box sx={{ position: 'relative', height: '100%', minHeight: 0 }}>
      <EditorPane
        language="json"
        monacoTheme={monacoTheme}
        value={value}
        readOnly
        wordWrap
        decorations={decorations}
        header={header}
        bare={bare}
      />

      {showOverlay && (
        <Box
          sx={{
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: 12,
            zIndex: 8,
            maxHeight: '60%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: t.surface2,
            border: `1px solid ${t.border}`,
            borderRadius: '10px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
            overflow: 'hidden',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{ px: 1.5, py: 1, borderBottom: `1px solid ${t.borderSoft}`, bgcolor: t.surface3 }}
          >
            <Typography sx={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: t.red }}>
              Compiled with {errorItems.length} problem{errorItems.length > 1 ? 's' : ''}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <IconButton size="small" onClick={() => setDismissed(true)} sx={{ color: t.inkFaint }} aria-label="Dismiss problems">
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Box sx={{ overflowY: 'auto' }}>
            <ProblemList errors={errorItems} onNavigate={onNavigateToError} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
