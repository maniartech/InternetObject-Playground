import { useState } from 'react';
import { Box, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Switch, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import type { Mode } from '../theme/muiTheme';
import { useTokens } from '../theme/muiTheme';
import logoUrl from '../logo.png';

export const NAV_LINKS = [
  { label: 'Home', href: 'https://www.internetobject.org/' },
  { label: 'IO vs JSON', href: 'https://www.internetobject.org/io-vs-json/' },
  { label: 'The Story', href: 'https://www.internetobject.org/the-story/' },
  { label: 'Join Community', href: 'https://www.internetobject.org/community/' },
  { label: 'Specification', href: 'https://docs.internetobject.org' },
];

interface Props {
  mode: Mode;
  isMobile?: boolean;
  showSchema: boolean;
  onToggleShowSchema: (v: boolean) => void;
  onImportJson: () => void;
  onShare: () => void;
  onToggleTheme: () => void;
  onToggleNav: () => void;
}

export function Header({ mode, isMobile, showSchema, onToggleShowSchema, onImportJson, onShare, onToggleTheme, onToggleNav }: Props) {
  const t = useTokens();
  const theme = useTheme();
  const showNav = useMediaQuery(theme.breakpoints.up('lg'));
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const closeMenu = () => setMenuAnchor(null);

  const itemText = (label: string) => <ListItemText disableTypography><Typography sx={{ fontSize: 14, color: t.ink }}>{label}</Typography></ListItemText>;

  return (
    <Box
      component="header"
      sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: { xs: 1, sm: 2 }, height: 52, bgcolor: 'transparent' }}
    >
      <IconButton size="small" onClick={onToggleNav} sx={{ color: t.inkDim }} aria-label="Toggle samples">
        <MenuRoundedIcon fontSize="small" />
      </IconButton>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
        <Box component="img" src={logoUrl} alt="Internet Object" sx={{ width: 22, height: 22, display: 'block', filter: mode === 'dark' ? 'none' : 'contrast(0.85)' }} />
        <Typography sx={{ fontWeight: 600, fontSize: 18, letterSpacing: '0.02em', color: t.ink, fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase' }}>
          Playground
        </Typography>
        {!isMobile && (
          <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: 12.5, color: t.inkFaint, borderLeft: `1px solid ${t.border}`, pl: 1, ml: 0.5, whiteSpace: 'nowrap' }}>
            Internet Object vs. JSON: Try It!
          </Typography>
        )}
      </Stack>

      <Box sx={{ flex: 1 }} />

      {isMobile ? (
        <>
          <IconButton size="small" onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ color: t.inkDim }} aria-label="More actions">
            <MoreVertRoundedIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { sx: { bgcolor: t.surface2, border: `1px solid ${t.border}`, backgroundImage: 'none', minWidth: 210, mt: 0.5 } } }}
          >
            {/* Toggle stays open so the change is visible. */}
            <MenuItem onClick={() => onToggleShowSchema(!showSchema)}>
              <ListItemIcon sx={{ color: t.inkDim, minWidth: 34 }}><ViewSidebarRoundedIcon fontSize="small" /></ListItemIcon>
              {itemText('Separate Schema')}
              <Switch size="small" edge="end" checked={showSchema} sx={{ ml: 1.5, pointerEvents: 'none' }} />
            </MenuItem>
            <Divider sx={{ borderColor: t.borderSoft }} />
            <MenuItem onClick={() => { onImportJson(); closeMenu(); }}>
              <ListItemIcon sx={{ color: t.inkDim, minWidth: 34 }}><SyncAltRoundedIcon fontSize="small" /></ListItemIcon>
              {itemText('JSON to IO')}
            </MenuItem>
            <MenuItem onClick={() => { onShare(); closeMenu(); }}>
              <ListItemIcon sx={{ color: t.inkDim, minWidth: 34 }}><IosShareRoundedIcon fontSize="small" /></ListItemIcon>
              {itemText('Share')}
            </MenuItem>
            <Divider sx={{ borderColor: t.borderSoft }} />
            <MenuItem onClick={() => { onToggleTheme(); closeMenu(); }}>
              <ListItemIcon sx={{ color: t.inkDim, minWidth: 34 }}>
                {mode === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
              </ListItemIcon>
              {itemText(mode === 'dark' ? 'Light mode' : 'Dark mode')}
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Stack direction="row" alignItems="center" spacing={1.25}>
          {showNav && (
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mr: 1 }}>
              {NAV_LINKS.map((l) => (
                <Box
                  key={l.label}
                  component="a"
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ fontSize: 13.5, color: t.inkDim, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color .2s', '&:hover': { color: t.accent } }}
                >
                  {l.label}
                </Box>
              ))}
            </Stack>
          )}

          <Button size="small" variant="outlined" startIcon={<SyncAltRoundedIcon />} onClick={onImportJson} sx={{ color: t.inkDim, borderColor: t.border }}>
            JSON to IO
          </Button>
          <Button size="small" variant="outlined" startIcon={<IosShareRoundedIcon />} onClick={onShare} sx={{ color: t.inkDim, borderColor: t.border }}>
            Share
          </Button>
          <Tooltip title="Toggle theme">
            <IconButton size="small" onClick={onToggleTheme} sx={{ color: t.inkDim }} aria-label="Toggle theme">
              {mode === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Box>
  );
}
