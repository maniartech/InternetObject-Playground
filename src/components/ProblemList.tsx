import { Box } from '@mui/material';
import { MONO, useTokens } from '../theme/muiTheme';
import type { ErrorItem } from '../types/errors';

/** Sorted, clickable list of parse problems. Shared by the desktop output overlay
 *  and the mobile problems drawer. */
export function ProblemList({ errors, onNavigate }: { errors: ErrorItem[]; onNavigate?: (item: ErrorItem) => void }) {
  const t = useTokens();
  const sorted = [...errors].sort((a, b) =>
    a.range.startLine !== b.range.startLine ? a.range.startLine - b.range.startLine : a.range.startColumn - b.range.startColumn,
  );
  const clickable = !!onNavigate;

  return (
    <Box>
      {sorted.map((item) => {
        const isValidation = item.category === 'validation';
        const barColor = isValidation ? 'rgba(255,152,0,0.9)' : 'rgba(255,83,83,0.8)';
        const prefix = item.category === 'syntax' ? 'SYNTAX_ERROR: ' : isValidation ? 'VALIDATION_ERROR: ' : 'ERROR: ';
        const where = item.source === 'defs' ? 'Schema' : 'Document';
        return (
          <Box
            key={item.id}
            onClick={clickable ? () => onNavigate!(item) : undefined}
            title={clickable ? `Jump to ${where}` : undefined}
            sx={{
              position: 'relative',
              px: 1.5,
              py: 1,
              pl: 2,
              fontFamily: MONO,
              fontSize: 12,
              lineHeight: 1.5,
              color: isValidation ? t.amber : t.ink,
              cursor: clickable ? 'pointer' : 'default',
              borderTop: `1px solid ${t.borderSoft}`,
              '&:first-of-type': { borderTop: 'none' },
              '&::before': { content: '""', position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', bgcolor: barColor },
              '&:hover': clickable ? { bgcolor: t.surface3 } : undefined,
            }}
          >
            {clickable && (
              <Box component="span" sx={{ color: t.inkFaint, mr: 0.75, fontSize: 10.5 }}>
                [{where}]
              </Box>
            )}
            {prefix}
            {item.message}
          </Box>
        );
      })}
    </Box>
  );
}
