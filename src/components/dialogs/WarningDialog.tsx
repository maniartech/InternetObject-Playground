import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { FocusSafeDialog } from './FocusSafeDialog';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { useTokens } from '../../theme/muiTheme';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export function WarningDialog({ isOpen, onClose, title = 'Warning', message }: Props) {
  const t = useTokens();
  return (
    <FocusSafeDialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { bgcolor: t.surface, backgroundImage: 'none', border: `1px solid ${t.border}`, borderRadius: '12px' } }}>
      <Box sx={{ p: 3 }}>
        <IconButton size="small" onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, color: t.inkFaint }} aria-label="Close"><CloseRoundedIcon fontSize="small" /></IconButton>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '10px', display: 'grid', placeItems: 'center', bgcolor: 'rgba(217,164,65,0.15)', color: t.amber }}>
            <WarningAmberRoundedIcon />
          </Box>
          <Typography variant="h6" sx={{ color: t.ink, fontWeight: 700 }}>{title}</Typography>
        </Stack>
        <Typography sx={{ fontSize: 14, color: t.inkDim, mb: 2.5 }}>{message}</Typography>
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained" onClick={onClose}>Got it</Button>
        </Stack>
      </Box>
    </FocusSafeDialog>
  );
}
