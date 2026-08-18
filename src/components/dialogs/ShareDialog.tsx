import { useEffect, useRef, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, InputBase, Stack, Typography } from '@mui/material';
import { FocusSafeDialog } from './FocusSafeDialog';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { MONO, useTokens } from '../../theme/muiTheme';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  showSchema: boolean;
  minifiedOutput: boolean;
  skipErrors: boolean;
}

export function ShareDialog({ isOpen, onClose, url, showSchema, minifiedOutput, skipErrors }: Props) {
  const t = useTokens();
  const [copied, setCopied] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const displayUrl = shortUrl || url;

  useEffect(() => {
    if (isOpen) {
      setShortUrl('');
      setCopied(false);
      setIsShortening(false);
      setTimeout(() => inputRef.current?.select(), 100);
    } else {
      abortRef.current?.abort();
      abortRef.current = null;
      setIsShortening(false);
    }
  }, [isOpen, url]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShorten = async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const signal = controller.signal;
    setIsShortening(true);

    const tryPost = async (endpoint: string) => {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url }),
        signal,
      });
      if (res.ok) {
        const text = (await res.text()).trim();
        if (!signal.aborted) {
          setShortUrl(text);
          return true;
        }
      }
      return false;
    };

    try {
      try { if (await tryPost('https://da.gd/s')) return; } catch (e) { if (signal.aborted) throw e; console.warn('da.gd failed:', e); }
      try { if (await tryPost('https://clck.ru/--')) return; } catch (e) { if (signal.aborted) throw e; console.warn('clck.ru failed:', e); }
      try {
        const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, { signal });
        if (res.ok) {
          const text = await res.text();
          if (!signal.aborted) setShortUrl(text);
        }
      } catch (e) { if (signal.aborted) throw e; console.error('All shorteners failed:', e); }
    } catch (e: any) {
      if (e.name === 'AbortError') console.log('Shortening aborted');
    } finally {
      if (!signal.aborted) {
        setIsShortening(false);
        abortRef.current = null;
      }
    }
  };

  const tag = (active: boolean, label: string) => (
    <Box
      component="span"
      sx={{
        fontSize: 11.5,
        fontFamily: MONO,
        px: 1,
        py: 0.5,
        borderRadius: '6px',
        border: `1px solid ${active ? t.accent : t.border}`,
        color: active ? t.accentBright : t.inkFaint,
        bgcolor: active ? t.accentSoft : 'transparent',
      }}
    >
      {active ? '✓' : '○'} {label}
    </Box>
  );

  return (
    <FocusSafeDialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: t.surface, backgroundImage: 'none', border: `1px solid ${t.border}`, borderRadius: '12px', m: { xs: 2, sm: 4 }, width: { xs: 'calc(100% - 32px)', sm: '100%' } } }}>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <IconButton size="small" onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, color: t.inkFaint }} aria-label="Close"><CloseRoundedIcon fontSize="small" /></IconButton>

        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '10px', display: 'grid', placeItems: 'center', bgcolor: t.accentSoft, color: t.accent }}>
            <ShareRoundedIcon />
          </Box>
          <Typography variant="h6" sx={{ color: t.ink, fontWeight: 700 }}>Share Internet Object Code</Typography>
        </Stack>

        <Typography sx={{ fontSize: 13.5, color: t.inkDim, mb: 2 }}>
          Share your schema and data with others — a lean, schema-first alternative to JSON.
        </Typography>

        <Box sx={{ mb: 1.5 }}>
          <InputBase
            inputRef={inputRef}
            value={displayUrl}
            readOnly
            fullWidth
            onClick={(e) => (e.target as HTMLInputElement).select()}
            sx={{ mb: 1, px: 1.5, py: 1, fontFamily: MONO, fontSize: 12.5, color: t.ink, bgcolor: t.surface3, border: `1px solid ${t.border}`, borderRadius: '8px' }}
            inputProps={{ 'aria-label': 'Share URL' }}
          />
          <Stack direction="row" spacing={1}>
            {!shortUrl && (
              <Button variant="outlined" onClick={handleShorten} disabled={isShortening} sx={{ flex: 1, color: t.inkDim, borderColor: t.border }}>
                {isShortening ? <CircularProgress size={16} color="inherit" /> : 'Shorten'}
              </Button>
            )}
            <Button variant="contained" onClick={handleCopy} startIcon={copied ? <CheckRoundedIcon /> : undefined} sx={{ flex: 1 }}>
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </Stack>
        </Box>

        {!shortUrl && (
          <Typography sx={{ fontSize: 12, color: t.inkFaint, mb: 2 }}>
            Tip: for large datasets, use <b>Shorten</b> to generate a compact link.
          </Typography>
        )}

        <Typography sx={{ fontSize: 11.5, color: t.inkFaint, mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Included settings</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {tag(showSchema, 'Separate Schema')}
          {tag(minifiedOutput, 'Minified')}
          {tag(skipErrors, 'Skip Errors')}
        </Stack>
      </Box>
    </FocusSafeDialog>
  );
}
