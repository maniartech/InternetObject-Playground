import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Snackbar, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LOCAL_KEYS } from '../../url';
import { useTokens } from '../../theme/muiTheme';

/** First-visit hint pointing users at the Samples list. */
export function WelcomeNotification({ onClose }: { onClose?: () => void }) {
  const t = useTokens();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_KEYS.visited)) {
      const id = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(id);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(LOCAL_KEYS.visited, 'true');
    setOpen(false);
    onClose?.();
  };

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} sx={{ top: { xs: 64, sm: 64 } }}>
      <Box sx={{ maxWidth: 320, p: 2, bgcolor: t.surface2, border: `1px solid ${t.border}`, borderRadius: '12px', boxShadow: '0 12px 32px rgba(0,0,0,0.35)' }} role="dialog" aria-labelledby="welcome-title">
        <Stack direction="row" alignItems="flex-start">
          <Typography id="welcome-title" sx={{ fontWeight: 700, fontSize: 15, color: t.ink, flex: 1 }}>
            👋 Welcome to Internet Object Playground!
          </Typography>
          <IconButton size="small" onClick={handleClose} sx={{ color: t.inkFaint, mt: -0.5, mr: -0.5 }} aria-label="Close welcome"><CloseRoundedIcon fontSize="small" /></IconButton>
        </Stack>
        <Typography sx={{ fontSize: 13, color: t.inkDim, mt: 1 }}>
          Open the <b>Samples</b> panel (top-left menu) to load examples and explore different Internet Object concepts.
        </Typography>
        <Typography sx={{ fontSize: 12.5, color: t.inkFaint, mt: 1 }}>
          Try categories like Simple, IO Types, Schema and Definitions, and Applications.
        </Typography>
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1.5 }}>
          <Button size="small" variant="contained" onClick={handleClose}>Got it!</Button>
        </Stack>
      </Box>
    </Snackbar>
  );
}
