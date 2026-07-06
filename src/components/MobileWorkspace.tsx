import { useState } from 'react';
import { Box, FormControlLabel, IconButton, Switch, Tab, Tabs, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { EditorPane, type CaretInfo, type EditorSelection } from './EditorPane';
import { OutputPane } from './OutputPane';
import { ProblemList } from './ProblemList';
import { Sidebar, type SampleGroup } from './Sidebar';
import { useTokens, MONO } from '../theme/muiTheme';
import type { EditorMarker, ErrorItem } from '../types/errors';

export type MobileTab = 'schema' | 'document' | 'json';

interface Props {
  monacoTheme: string;
  showSchema: boolean;
  tab: MobileTab;
  setTab: (t: MobileTab) => void;

  schema: string;
  onSchemaChange: (v: string | undefined) => void;
  defMarkers: EditorMarker[];
  onSchemaCaret: (c: CaretInfo) => void;
  schemaSelection: EditorSelection | null;

  document: string;
  onDocumentChange: (v: string | undefined) => void;
  markers: EditorMarker[];
  onDocumentCaret: (c: CaretInfo) => void;
  docSelection: EditorSelection | null;

  schemaBytes: number;
  docBytes: number;
  jsonText: string;
  jsonBytes: number;
  /** Comparison badge for the document, e.g. "45% Smaller than JSON". */
  docBadge?: string;
  minifiedOutput: boolean;
  skipErrors: boolean;
  onToggleMinify: (v: boolean) => void;
  onToggleSkip: (v: boolean) => void;
  error: boolean;
  errorItems: ErrorItem[];
  onNavigateToError: (item: ErrorItem) => void;

  drawerOpen: boolean;
  setDrawerOpen: (b: boolean) => void;
  groups: SampleGroup[];
  activeId: string;
  onSelectSample: (id: string) => void;
  onReset: () => void;
  canReset: boolean;
}

export function MobileWorkspace(props: Props) {
  const t = useTokens();
  const [problemsOpen, setProblemsOpen] = useState(false);

  const activeTab: MobileTab = !props.showSchema && props.tab === 'schema' ? 'document' : props.tab;

  const tabs: { key: MobileTab; label: string }[] = [
    ...(props.showSchema ? [{ key: 'schema' as const, label: 'Schema' }] : []),
    { key: 'document', label: 'Document' },
    { key: 'json', label: 'JSON' },
  ];

  const activeBytes =
    activeTab === 'schema' ? props.schemaBytes : activeTab === 'json' ? props.jsonBytes : props.docBytes;
  const activeComparison = activeTab === 'document' ? props.docBadge : undefined;

  const problemCount = props.errorItems.length;
  const hasProblems = props.error && problemCount > 0;

  const navigate = (item: ErrorItem) => {
    props.onNavigateToError(item);
    setProblemsOpen(false);
  };

  const paneBox = (visible: boolean, node: React.ReactNode) => (
    <Box sx={{ position: 'absolute', inset: 0, display: visible ? 'block' : 'none' }}>{node}</Box>
  );

  return (
    <Box sx={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', bgcolor: t.surface, border: `1px solid ${t.border}`, borderRadius: '10px', overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => props.setTab(v)}
          variant="fullWidth"
          sx={{
            minHeight: 38,
            bgcolor: t.surface2,
            '& .MuiTab-root': { minHeight: 38, fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', textTransform: 'none', color: t.inkFaint, py: 0 },
            '& .MuiTab-root:not(:last-of-type)': { borderRight: `1px solid ${t.borderSoft}` },
            '& .Mui-selected': { color: `${t.ink} !important` },
            '& .MuiTabs-indicator': { backgroundColor: t.accent, height: 2 },
          }}
        >
          {tabs.map((tb) => <Tab key={tb.key} value={tb.key} label={tb.label} />)}
        </Tabs>

        {/* Status row — bytes + comparison, plus the JSON output toggles on the JSON tab.
            Tinted with the selection colour for an immersive feel. */}
        <Box
          sx={{
            flex: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            minHeight: 32,
            bgcolor: t.accentSoft,
            borderTop: `1px solid ${t.borderSoft}`,
            borderBottom: `1px solid ${t.borderSoft}`,
            fontFamily: MONO,
            fontSize: 11,
          }}
        >
          <Box component="span" sx={{ color: t.inkDim, whiteSpace: 'nowrap' }}>{activeBytes.toLocaleString()} B</Box>
          {activeComparison && (
            <>
              <Box component="span" sx={{ color: t.inkFaint }}>·</Box>
              <Box component="span" sx={{ color: t.accentBright, fontWeight: 600, whiteSpace: 'nowrap' }}>{activeComparison}</Box>
            </>
          )}
          {activeTab === 'json' && (
            <>
              <Box sx={{ flex: 1 }} />
              <FormControlLabel
                control={<Switch size="small" checked={props.skipErrors} onChange={(e) => props.onToggleSkip(e.target.checked)} />}
                label={<Typography sx={{ fontFamily: MONO, fontSize: 10.5, color: t.inkDim, whiteSpace: 'nowrap' }}>Skip Errors</Typography>}
                title="Skip error objects in output"
                sx={{ m: 0, '& .MuiFormControlLabel-label': { ml: 0.25 } }}
              />
              <FormControlLabel
                control={<Switch size="small" checked={props.minifiedOutput} onChange={(e) => props.onToggleMinify(e.target.checked)} />}
                label={<Typography sx={{ fontFamily: MONO, fontSize: 10.5, color: t.inkDim, whiteSpace: 'nowrap' }}>Minify</Typography>}
                title="Compress the JSON output"
                sx={{ m: 0, '& .MuiFormControlLabel-label': { ml: 0.25 } }}
              />
            </>
          )}
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
          {paneBox(
            activeTab === 'schema',
            <EditorPane language="io" bare monacoTheme={props.monacoTheme} value={props.schema} onChange={props.onSchemaChange} markers={props.defMarkers} onCaretChange={props.onSchemaCaret} selection={props.schemaSelection} />,
          )}
          {paneBox(
            activeTab === 'document',
            <EditorPane language="io" bare monacoTheme={props.monacoTheme} value={props.document} onChange={props.onDocumentChange} markers={props.markers} onCaretChange={props.onDocumentCaret} selection={props.docSelection} />,
          )}
          {paneBox(
            activeTab === 'json',
            <OutputPane bare hideOverlay monacoTheme={props.monacoTheme} value={props.jsonText} error={props.error} errorItems={props.errorItems} onNavigateToError={props.onNavigateToError} />,
          )}
        </Box>

        {/* Persistent problems bar — visible across all tabs; tap to open the drawer. */}
        {hasProblems && (
          <Box
            onClick={() => setProblemsOpen(true)}
            sx={{
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              height: 34,
              cursor: 'pointer',
              bgcolor: 'rgba(255,107,114,0.12)',
              borderTop: `1px solid ${t.red}55`,
            }}
          >
            <ErrorOutlineRoundedIcon sx={{ fontSize: 16, color: t.red }} />
            <Typography sx={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: t.red }}>
              {problemCount} problem{problemCount > 1 ? 's' : ''}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <KeyboardArrowUpRoundedIcon sx={{ fontSize: 18, color: t.red }} />
          </Box>
        )}
      </Box>

      {/* Problems drawer (bottom sheet) — works across tabs; each row jumps to its editor. */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 1300, display: problemsOpen ? 'block' : 'none' }}>
        <Box onClick={() => setProblemsOpen(false)} sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.55)' }} />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            maxHeight: '60%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: t.surface2,
            borderTop: `1px solid ${t.border}`,
            borderRadius: '12px 12px 0 0',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ flex: 'none', display: 'flex', alignItems: 'center', px: 1.5, py: 1, borderBottom: `1px solid ${t.borderSoft}`, bgcolor: t.surface3 }}>
            <Typography sx={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: t.red }}>
              {problemCount} problem{problemCount > 1 ? 's' : ''}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <IconButton size="small" onClick={() => setProblemsOpen(false)} sx={{ color: t.inkFaint }} aria-label="Close problems">
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <ProblemList errors={props.errorItems} onNavigate={navigate} />
          </Box>
        </Box>
      </Box>

      {/* Samples drawer (hand-rolled: MUI Drawer transitions don't animate under React 19). */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 1200, display: props.drawerOpen ? 'block' : 'none' }}>
        <Box onClick={() => props.setDrawerOpen(false)} sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.55)' }} />
        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '82%', maxWidth: 320 }}>
          <Sidebar
            groups={props.groups}
            activeId={props.activeId}
            onSelect={(id) => { props.onSelectSample(id); props.setDrawerOpen(false); }}
            onReset={props.onReset}
            canReset={props.canReset}
            showNav
          />
        </Box>
      </Box>
    </Box>
  );
}
