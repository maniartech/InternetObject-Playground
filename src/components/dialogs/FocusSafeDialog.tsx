import { useEffect, useRef } from 'react';
import { Dialog, type DialogProps } from '@mui/material';

/**
 * A Dialog that returns focus to its trigger without tripping the browser's aria-hidden check.
 *
 * MUI hides the rest of the page from assistive tech by putting `aria-hidden` on #root, and removes
 * it only once the closing transition has finished. But its focus restore runs *during* that
 * transition, so focus lands back on the trigger button while #root is still aria-hidden — which is
 * exactly the state browsers report as "Blocked aria-hidden on an element because its descendant
 * retained focus", and which genuinely strands screen-reader users on a hidden element.
 *
 * So: turn MUI's restore off, remember what was focused when we opened, and focus it again on
 * `onExited` — by which point aria-hidden is gone and the page is visible to assistive tech.
 */
export function FocusSafeDialog({ open, TransitionProps, ...rest }: DialogProps) {
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) trigger.current = document.activeElement as HTMLElement | null;
  }, [open]);

  return (
    <Dialog
      {...rest}
      open={open}
      disableRestoreFocus
      TransitionProps={{
        ...TransitionProps,
        onExited: (node: HTMLElement) => {
          TransitionProps?.onExited?.(node);
          trigger.current?.focus();
        },
      }}
    />
  );
}
