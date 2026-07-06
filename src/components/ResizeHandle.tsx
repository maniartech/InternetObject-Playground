import { PanelResizeHandle } from 'react-resizable-panels';
import { Box } from '@mui/material';
import { useTokens } from '../theme/muiTheme';

/**
 * A themed drag handle between panel cards. The gutter is the app background;
 * a small centred grip marks the affordance and glows on hover/drag.
 * `orientation` is the parent PanelGroup's direction.
 */
export function ResizeHandle({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  const t = useTokens();
  const isCol = orientation === 'horizontal';
  return (
    <PanelResizeHandle>
      <Box
        sx={{
          width: isCol ? '10px' : '100%',
          height: isCol ? '100%' : '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isCol ? 'col-resize' : 'row-resize',
          '& .grip': {
            bgcolor: t.border,
            borderRadius: '3px',
            transition: 'background .15s',
            width: isCol ? '3px' : '28px',
            height: isCol ? '28px' : '3px',
          },
          '&:hover .grip, &:active .grip': { bgcolor: t.accent },
        }}
      >
        <Box className="grip" />
      </Box>
    </PanelResizeHandle>
  );
}
