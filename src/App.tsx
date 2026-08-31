import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, CssBaseline, FormControlLabel, Switch, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Panel, PanelGroup, type ImperativePanelHandle } from 'react-resizable-panels';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { EditorPane, type CaretInfo, type EditorSelection } from './components/EditorPane';
import { OutputPane } from './components/OutputPane';
import { StatusBar } from './components/StatusBar';
import { ResizeHandle } from './components/ResizeHandle';
import { MobileWorkspace, type MobileTab } from './components/MobileWorkspace';
import { PaneHeader, comparisonBadge } from './components/PaneHeader';
import { ShareDialog } from './components/dialogs/ShareDialog';
import { ImportJsonDialog } from './components/dialogs/ImportJsonDialog';
import { WarningDialog } from './components/dialogs/WarningDialog';
import { WelcomeNotification } from './components/dialogs/WelcomeNotification';

import { makeTheme, palette, TokensContext, STORAGE_MODE_KEY, type Mode } from './theme/muiTheme';
import { monacoThemeFor } from './monaco';
import { MODEL_PATHS } from './completion/providers';
import { buildShareUrl, decodeShared, SESSION_KEYS, LOCAL_KEYS } from './url';
import sampleData from './sample-data';
import { useParseIO } from './hooks/use-parse-io-v2';
import { INITIAL_CURSOR, type CursorState } from './types/cursor';
import type { ErrorItem } from './types/errors';

const SAMPLE_GROUPS = sampleData.groups.map((g) => ({
  group: g.group,
  items: g.items.map((it) => ({ id: it.id, name: it.name })),
}));

export default function App() {
  const { sampleId } = useParams<{ sampleId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // ---- Theme ----
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem(STORAGE_MODE_KEY) as Mode) || 'dark');
  const theme = useMemo(() => makeTheme(mode), [mode]);
  const tokens = palette[mode];
  const monacoTheme = monacoThemeFor(mode);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => { localStorage.setItem(STORAGE_MODE_KEY, mode); }, [mode]);
  const toggleTheme = useCallback(() => setMode((m) => (m === 'dark' ? 'light' : 'dark')), []);

  // ---- Dialogs ----
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [warning, setWarning] = useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

  const prevSampleIdRef = useRef<string | undefined>(sampleId);

  // ---- Content state (init from URL query / session / sample — unchanged logic) ----
  const [sample, setSample] = useState(() => {
    if (searchParams.get('d')) return null;
    return sampleData.find(sampleId || '');
  });

  const [document, setDocument] = useState(() => {
    const shared = decodeShared(searchParams.get('d'));
    if (shared !== null) return shared;
    const sessSample = sessionStorage.getItem(SESSION_KEYS.sampleId);
    const sessDoc = sessionStorage.getItem(SESSION_KEYS.doc);
    if (sessDoc !== null && sessSample === (sampleId || '')) return sessDoc;
    return sample?.doc || '';
  });

  const [schema, setSchema] = useState(() => {
    const shared = decodeShared(searchParams.get('s'));
    if (shared !== null) return shared;
    const sessSample = sessionStorage.getItem(SESSION_KEYS.sampleId);
    const sessSchema = sessionStorage.getItem(SESSION_KEYS.schema);
    if (sessSchema !== null && sessSample === (sampleId || '')) return sessSchema;
    return sample?.schema || '';
  });

  const [showSchema, setShowSchema] = useState(() => {
    const sharedSep = searchParams.get('sep');
    if (sharedSep !== null) return sharedSep === 'true';
    const sessSample = sessionStorage.getItem(SESSION_KEYS.sampleId);
    const sessShow = sessionStorage.getItem(SESSION_KEYS.showSchema);
    if (sessShow !== null && sessSample === (sampleId || '')) return sessShow === 'true';
    return !!sample?.schema;
  });

  const [minifiedOutput, setMinifiedOutput] = useState(() => {
    const shared = searchParams.get('min');
    if (shared !== null) return shared === 'true';
    return localStorage.getItem(LOCAL_KEYS.minified) === 'true';
  });

  const [skipErrors, setSkipErrors] = useState(() => {
    const shared = searchParams.get('skip');
    if (shared !== null) return shared === 'true';
    return localStorage.getItem(LOCAL_KEYS.skipErrors) !== 'false';
  });

  const [hasVisited, setHasVisited] = useState(() => localStorage.getItem(LOCAL_KEYS.visited) === 'true');

  // ---- UI state ----
  const [cursor, setCursor] = useState<CursorState>(INITIAL_CURSOR);
  const [docSelection, setDocSelection] = useState<EditorSelection | null>(null);
  const [schemaSelection, setSchemaSelection] = useState<EditorSelection | null>(null);
  const [mobileTab, setMobileTab] = useState<MobileTab>('document');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);

  // ---- Parsing (worker-backed, unchanged) ----
  const { markers, defMarkers, jsonText, error, errorItems, parse } = useParseIO(
    document, schema, showSchema, minifiedOutput, skipErrors, { debug: false },
  );

  // Persist to session storage (unless in shared mode).
  useEffect(() => {
    if (!searchParams.get('d')) {
      sessionStorage.setItem(SESSION_KEYS.sampleId, sampleId || '');
      sessionStorage.setItem(SESSION_KEYS.doc, document);
      sessionStorage.setItem(SESSION_KEYS.schema, schema);
      sessionStorage.setItem(SESSION_KEYS.showSchema, String(showSchema));
    }
  }, [document, schema, showSchema, sampleId, searchParams]);

  // Reset content when the sampleId actually changes (navigation, not refresh).
  useEffect(() => {
    if (!searchParams.get('d') && !searchParams.get('s')) {
      if (sampleId !== prevSampleIdRef.current) {
        const found = sampleData.find(sampleId || '');
        setSample(found);
        setDocument(found?.doc || '');
        setSchema(found?.schema || '');
        setShowSchema(!!found?.schema);
        prevSampleIdRef.current = sampleId;
      }
    }
  }, [sampleId, searchParams]);

  // Debounced parse.
  useEffect(() => {
    const timer = setTimeout(() => parse(), 500);
    return () => clearTimeout(timer);
  }, [schema, document, showSchema, minifiedOutput, skipErrors, parse]);

  // ---- Handlers ----
  const handleSelectSample = useCallback((newId: string) => {
    const found = sampleData.find(newId);
    setSample(found);
    setShowSchema(!!found?.schema);
    setDocument(found?.doc || '');
    setSchema(found?.schema || '');
    setSearchParams({});
    navigate(`/${newId}`);
  }, [navigate, setSearchParams]);

  const isDirty = useMemo(() => {
    const d = sample?.doc || '';
    const s = sample?.schema || '';
    return document !== d || schema !== s || showSchema !== !!sample?.schema;
  }, [document, schema, showSchema, sample]);

  const handleReset = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEYS.sampleId);
    sessionStorage.removeItem(SESSION_KEYS.doc);
    sessionStorage.removeItem(SESSION_KEYS.schema);
    sessionStorage.removeItem(SESSION_KEYS.showSchema);
    const found = sampleData.find(sampleId || '');
    setSample(found);
    setDocument(found?.doc || '');
    setSchema(found?.schema || '');
    setShowSchema(!!found?.schema);
    setSearchParams({});
  }, [sampleId, setSearchParams]);

  const handleShare = useCallback(() => {
    if (!document.trim() && !schema.trim()) {
      setWarning({ isOpen: true, message: 'There is no content to share! Please add some data or schema before sharing.' });
      return;
    }
    setShareUrl(buildShareUrl({ document, schema, showSchema, minifiedOutput, skipErrors }));
    setIsShareOpen(true);
  }, [document, schema, showSchema, minifiedOutput, skipErrors]);

  const handleImportJSON = useCallback((importedSchema: string, importedDocument: string) => {
    setSchema(importedSchema);
    setDocument(importedDocument);
    if (importedSchema.trim()) setShowSchema(true);
    setSearchParams({});
    setSample(null);
  }, [setSearchParams]);

  // Reveal an error in its source editor. Schema (defs) errors open the schema pane/tab,
  // document errors the document pane/tab; on mobile we also switch to that tab.
  const handleNavigateToError = useCallback((item: ErrorItem) => {
    const sel: EditorSelection = {
      startLineNumber: item.range.startLine,
      startColumn: item.range.startColumn,
      endLineNumber: item.range.endLine,
      endColumn: item.range.endColumn,
    };
    if (item.source === 'defs') {
      setShowSchema(true);
      setSchemaSelection(sel);
      if (isMobile) setMobileTab('schema');
    } else {
      setDocSelection(sel);
      if (isMobile) setMobileTab('document');
    }
  }, [isMobile]);

  const setMinify = useCallback((v: boolean) => { localStorage.setItem(LOCAL_KEYS.minified, String(v)); setMinifiedOutput(v); }, []);
  const setSkip = useCallback((v: boolean) => { localStorage.setItem(LOCAL_KEYS.skipErrors, String(v)); setSkipErrors(v); }, []);

  const schemaCaret = useCallback((c: CaretInfo) => setCursor({ editorName: 'Definitions', ...c }), []);
  const documentCaret = useCallback((c: CaretInfo) => setCursor({ editorName: 'Internet Object', ...c }), []);

  const toggleNav = useCallback(() => {
    if (isMobile) { setDrawerOpen((v) => !v); return; }
    const p = sidebarPanelRef.current;
    if (p) (p.isCollapsed() ? p.expand() : p.collapse());
  }, [isMobile]);

  const docBadge = comparisonBadge(document.length, jsonText.length, minifiedOutput, error);

  const schemaToggle = (
    <FormControlLabel
      control={<Switch size="small" checked={showSchema} onChange={(e) => setShowSchema(e.target.checked)} />}
      label={<Typography sx={{ fontSize: 11.5, color: tokens.inkDim }}>Separate Schema</Typography>}
      title="Separate the schema from the data document"
      sx={{ m: 0 }}
    />
  );

  const outputToggles = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <FormControlLabel
        control={<Switch size="small" checked={skipErrors} onChange={(e) => setSkip(e.target.checked)} />}
        label={<Typography sx={{ fontSize: 11.5, color: tokens.inkDim }}>Skip Errors</Typography>}
        title="Skip error objects in output"
        sx={{ m: 0 }}
      />
      <FormControlLabel
        control={<Switch size="small" checked={minifiedOutput} onChange={(e) => setMinify(e.target.checked)} />}
        label={<Typography sx={{ fontSize: 11.5, color: tokens.inkDim }}>Minify</Typography>}
        title="Compress the JSON output"
        sx={{ m: 0 }}
      />
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <TokensContext.Provider value={tokens}>
        <CssBaseline />
        <Box component="a" href="#main-content" sx={{ position: 'absolute', left: -9999, top: 0, zIndex: 10000, '&:focus': { left: 8, top: 8, p: 1, bgcolor: '#000', color: '#fff', borderRadius: 1 } }}>
          Skip to main content
        </Box>

        <WelcomeNotification onClose={() => setHasVisited(true)} />
        <ShareDialog isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} url={shareUrl} showSchema={showSchema} minifiedOutput={minifiedOutput} skipErrors={skipErrors} />
        <ImportJsonDialog isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} onImport={handleImportJSON} monacoTheme={monacoTheme} />
        <WarningDialog isOpen={warning.isOpen} onClose={() => setWarning({ ...warning, isOpen: false })} message={warning.message} title="Nothing to Share" />

        {isMobile ? (
          <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: tokens.bg }}>
            <Header mode={mode} isMobile showSchema={showSchema} onToggleShowSchema={setShowSchema} onImportJson={() => setIsImportOpen(true)} onShare={handleShare} onToggleTheme={toggleTheme} onToggleNav={toggleNav} />
            <Box id="main-content" component="main" sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <MobileWorkspace
                monacoTheme={monacoTheme}
                showSchema={showSchema}
                tab={mobileTab}
                setTab={setMobileTab}
                schema={schema}
                onSchemaChange={(v) => setSchema(v ?? '')}
                defMarkers={defMarkers}
                onSchemaCaret={schemaCaret}
                document={document}
                onDocumentChange={(v) => setDocument(v ?? '')}
                markers={markers}
                onDocumentCaret={documentCaret}
                docSelection={docSelection}
                schemaSelection={schemaSelection}
                schemaBytes={schema.length}
                docBytes={document.length}
                jsonText={jsonText}
                jsonBytes={jsonText.length}
                docBadge={docBadge}
                minifiedOutput={minifiedOutput}
                skipErrors={skipErrors}
                onToggleMinify={setMinify}
                onToggleSkip={setSkip}
                error={error}
                errorItems={errorItems}
                onNavigateToError={handleNavigateToError}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                groups={SAMPLE_GROUPS}
                activeId={sample?.id || ''}
                onSelectSample={handleSelectSample}
                onReset={handleReset}
                canReset={isDirty}
              />
            </Box>
            <StatusBar cursor={cursor} />
          </Box>
        ) : (
          <Box sx={{ height: '100vh', display: 'grid', gridTemplateRows: '52px 1fr 26px', overflow: 'hidden', bgcolor: tokens.bg }}>
            <Header mode={mode} showSchema={showSchema} onToggleShowSchema={setShowSchema} onImportJson={() => setIsImportOpen(true)} onShare={handleShare} onToggleTheme={toggleTheme} onToggleNav={toggleNav} />

            <Box id="main-content" component="main" sx={{ minHeight: 0, minWidth: 0, px: 1.25, bgcolor: tokens.bg }}>
              <PanelGroup direction="horizontal" autoSaveId="io-shell" style={{ height: '100%' }}>
                <Panel ref={sidebarPanelRef} collapsible collapsedSize={0} defaultSize={16} minSize={12} maxSize={28}>
                  <Sidebar card groups={SAMPLE_GROUPS} activeId={sample?.id || ''} onSelect={handleSelectSample} onReset={handleReset} canReset={isDirty} highlightSamples={!hasVisited} />
                </Panel>
                <ResizeHandle orientation="horizontal" />

                <Panel minSize={40}>
                  <PanelGroup direction="horizontal" autoSaveId="io-editors" style={{ height: '100%' }}>
                    <Panel minSize={20}>
                      <PanelGroup direction="vertical" autoSaveId="io-left" style={{ height: '100%' }}>
                        {showSchema && (
                          <Panel id="schema" order={1} defaultSize={32} minSize={12}>
                            <EditorPane
                              language="io"
                              path={MODEL_PATHS.schema}
                              monacoTheme={monacoTheme}
                              value={schema}
                              onChange={(v) => setSchema(v ?? '')}
                              markers={defMarkers}
                              onCaretChange={schemaCaret}
                              selection={schemaSelection}
                              header={<PaneHeader label="Schema & Definitions" bytes={schema.length} />}
                            />
                          </Panel>
                        )}
                        {showSchema && <ResizeHandle orientation="vertical" />}
                        <Panel id="document" order={2} minSize={20}>
                          <EditorPane
                            language="io"
                            path={MODEL_PATHS.document}
                            monacoTheme={monacoTheme}
                            value={document}
                            onChange={(v) => setDocument(v ?? '')}
                            markers={markers}
                            onCaretChange={documentCaret}
                            selection={docSelection}
                            header={<PaneHeader label="Internet Object Document" bytes={document.length} badge={docBadge}>{schemaToggle}</PaneHeader>}
                          />
                        </Panel>
                      </PanelGroup>
                    </Panel>
                    <ResizeHandle orientation="horizontal" />

                    <Panel minSize={20}>
                      <OutputPane
                        monacoTheme={monacoTheme}
                        value={jsonText}
                        error={error}
                        errorItems={errorItems}
                        onNavigateToError={handleNavigateToError}
                        header={<PaneHeader label="JSON Output" bytes={jsonText.length} title="Comparable JSON output generated from the Internet Object document">{outputToggles}</PaneHeader>}
                      />
                    </Panel>
                  </PanelGroup>
                </Panel>
              </PanelGroup>
            </Box>

            <StatusBar cursor={cursor} />
          </Box>
        )}
      </TokensContext.Provider>
    </ThemeProvider>
  );
}
