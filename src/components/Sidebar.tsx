import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { MONO, useTokens } from '../theme/muiTheme';
import { NAV_LINKS } from './Header';

export interface SampleGroup {
  group: string;
  items: { id: string; name: string }[];
}

interface Props {
  groups: SampleGroup[];
  activeId: string;
  onSelect: (id: string) => void;
  onReset: () => void;
  canReset: boolean;
  /** Show external nav links at the bottom (used by the mobile drawer). */
  showNav?: boolean;
  highlightSamples?: boolean;
  /** Render as a rounded card (desktop panel) instead of a flush drawer. */
  card?: boolean;
}

export function Sidebar({ groups, activeId, onSelect, onReset, canReset, showNav, highlightSamples, card }: Props) {
  const t = useTokens();
  const cardSx = card
    ? { border: `1px solid ${t.border}`, borderRadius: '8px' }
    : { borderRight: `1px solid ${t.border}` };

  const item = (id: string, name: string) => {
    const active = id === activeId;
    return (
      <Box
        key={id || '__blank'}
        onClick={() => onSelect(id)}
        sx={{
          px: 1.25,
          py: 0.75,
          mx: 0.75,
          borderRadius: '6px',
          fontSize: 13,
          cursor: 'pointer',
          color: active ? t.accentBright : t.inkDim,
          bgcolor: active ? t.accentSoft : 'transparent',
          fontWeight: active ? 600 : 400,
          '&:hover': { bgcolor: active ? t.accentSoft : t.surface3, color: active ? t.accentBright : t.ink },
        }}
      >
        {name}
      </Box>
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: t.surface, overflow: 'hidden', ...cardSx }}>
      <Stack direction="row" alignItems="center" sx={{ px: 1.5, py: 1, borderBottom: `1px solid ${t.borderSoft}`, flex: 'none' }}>
        <Typography sx={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.inkDim }}>
          Samples
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Tooltip title={canReset ? 'Reset to sample data' : 'No changes to reset'}>
          <span>
            <IconButton size="small" onClick={onReset} disabled={!canReset} sx={{ color: t.inkFaint }} aria-label="Reset to sample data">
              <RestartAltRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          py: 1,
          ...(highlightSamples && {
            '@keyframes sbpulse': { '0%,100%': { boxShadow: `inset 3px 0 0 ${t.accent}` }, '50%': { boxShadow: 'inset 3px 0 0 transparent' } },
            animation: 'sbpulse 2s ease-in-out 3',
          }),
        }}
      >
        {item('', 'Blank')}
        {groups.map((g) => (
          <Box key={g.group} sx={{ mt: 1 }}>
            <Typography sx={{ px: 2, py: 0.5, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: t.inkFaint }}>
              {g.group}
            </Typography>
            {g.items.map((it) => item(it.id, it.name))}
          </Box>
        ))}
      </Box>

      {showNav && (
        <Box sx={{ flex: 'none', borderTop: `1px solid ${t.borderSoft}`, py: 1 }}>
          {NAV_LINKS.map((l) => (
            <Box
              key={l.label}
              component="a"
              href={l.href}
              target="_blank"
              rel="noreferrer"
              sx={{ display: 'block', px: 2, py: 0.75, fontSize: 13, color: t.inkDim, textDecoration: 'none', '&:hover': { color: t.accent } }}
            >
              {l.label}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
