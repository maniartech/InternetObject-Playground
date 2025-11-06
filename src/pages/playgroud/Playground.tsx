import 'split-pane-react/esm/themes/default.css';

import { useEffect, useRef, useState } from 'react';
import Toggle             from 'react-toggle';
import { useRecoilState } from 'recoil';
import { Pane }           from 'split-pane-react';
import SplitPane          from 'split-pane-react/esm/SplitPane';

import Bar            from '../../components/bar/Bar';
import Editor         from '../../components/editor/Editor';
import Output         from '../../components/output/Output';
import editorPosition from '../../states/editor-pos';
import { useParseIO } from '../../hooks/use-parse-io-v2';
import { findMarkerForPosition } from '../../utils/errorSorting';

interface PlaygroundProps {
  showSchema: boolean;
  setShowSchema: (show: boolean) => void;
  document: string;
  schema: string;
  schemaPanelHeight?: number;
}

const DEFAULT_SCHEMA_PANEL_HEIGHT = 200;
const MIN_PANEL_SIZE              = 100;
const DEFAULT_VERTICAL_SIZE       = '60%';

const Playground = ({
  showSchema,  setShowSchema,
  document,
  schema,
  schemaPanelHeight,
}: PlaygroundProps) => {

  const [, setEditorPos] = useRecoilState(editorPosition);

  // State for horizontal and vertical split sizes
  const [sizesH, setHSizes] = useState<[number | string, string]>([0, 'auto']);
  const sizesHRef = useRef(sizesH);
  useEffect(() => {
    sizesHRef.current = sizesH;
  }, [sizesH]);

  const [sizesV, setVSizes] = useState<[number | string, string]>([0, 'auto']);
  const [schemaText, setSchemaText] = useState<string>(schema);
  const [documentText, setDocumentText] = useState<string>(document);
  const [minifiedOutput, setMinifiedOutput] = useState<boolean>(localStorage.getItem('minifiedOutput') === 'true');
  const [skipErrors, setSkipErrors] = useState<boolean>(localStorage.getItem('skipErrors') !== 'false');
  const { markers, defMarkers, jsonText, error, errorMessages, errorItems, parse, isParsing } = useParseIO(
    documentText,
    schemaText,
    showSchema,
    minifiedOutput,
    skipErrors,
    { useWorker: true, debug: false } // Enable Web Worker parsing
  );
  const [docSelection, setDocSelection] = useState<{ startLineNumber: number; startColumn: number; endLineNumber?: number; endColumn?: number } | null>(null);


  // Set initial horizontal split size when schemaPanelHeight changes
  useEffect(() => {
    setHSizes([schemaPanelHeight || DEFAULT_SCHEMA_PANEL_HEIGHT, 'auto']);
  }, [schemaPanelHeight]);

  // Debounced parse effect
  useEffect(() => {
    const timer = setTimeout(() => {
      parse();
    }, 500);
    return () => clearTimeout(timer);
  }, [schemaText, documentText, showSchema, minifiedOutput, skipErrors, parse]);

  // Sync schema and document text with props
  useEffect(() => {
    setSchemaText(schema);
    setDocumentText(document);
  }, [schema, document]);

  // Set initial vertical split size
  useEffect(() => {
    if (sizesV[0] === 0) {
      setVSizes([DEFAULT_VERTICAL_SIZE, 'auto']);
    }
  }, [sizesV]);

  // Update horizontal split when showSchema changes
  useEffect(() => {
    if (!showSchema) {
      setHSizes([0, 'auto']);
    } else {
      setHSizes([schemaPanelHeight || DEFAULT_SCHEMA_PANEL_HEIGHT, 'auto']);
    }
  }, [showSchema, schemaPanelHeight]);

  // Handlers
  const handleHBarDragEnd = () => {
    const currentSizesH = sizesHRef.current;
    if (typeof currentSizesH[0] === 'number') {
      if (currentSizesH[0] <= MIN_PANEL_SIZE) {
        setHSizes([showSchema ? 0 : DEFAULT_SCHEMA_PANEL_HEIGHT, 'auto']);
        setShowSchema(!showSchema);
      } else {
        setShowSchema(currentSizesH[0] > 0);
      }
    }
  };

  const handleCaretPositionChange = (name: string, position: any) => {
    setEditorPos({
      editorName: name,
      row: position.row,
      column: position.column,
      position: position.position,
    });
  };

  const handleNavigateToError = ({ line, col }: { line: number; col: number }) => {
    if (!markers || markers.length === 0) return;

    // Use tested utility to find best matching marker
    const chosen = findMarkerForPosition(markers, { line, col });

    if (chosen) {
      setDocSelection({
        startLineNumber: chosen.startLineNumber ?? line,
        startColumn: chosen.startColumn ?? col,
        endLineNumber: chosen.endLineNumber ?? line,
        endColumn: chosen.endColumn ?? (col + 1),
      });
    }
  };

  return (
    <div className="editor-area">
      <SplitPane
        split="vertical"
        sizes={sizesV}
        onChange={setVSizes}
        sashRender={(size: number) => <div className="sash" />}
      >
        <Pane minSize={20} maxSize="80%">
          <div className="editor-area-left">
            <SplitPane
              split="horizontal"
              sizes={sizesH}
              onChange={setHSizes}
              onDragEnd={handleHBarDragEnd}
              sashRender={() => <div className="sash" />}
            >
              <Pane minSize={0}>
                <div className="top" style={{ height: '100%' }}>
                  <Bar label="Schema & Definitions" bytes={schemaText.length} />
                  <Editor
                    onChange={setSchemaText}
                    value={schemaText}
                    markers={defMarkers}
                    onChangeCaretPosition={pos => handleCaretPositionChange("Definitions", pos)}
                  />
                </div>
              </Pane>
              <Pane minSize={200}>
                <div className="bottom" style={{ height: '100%' }}>
                  <Bar label="Internet Object Document" bytes={documentText.length} outputBytes={jsonText.length} minified={minifiedOutput} isError={error} />
                  <Editor
                    value={documentText}
                    markers={markers}
                    onChange={setDocumentText}
                    onChangeCaretPosition={pos => handleCaretPositionChange("Internet Object", pos)}
                    selection={docSelection}
                  />
                </div>
              </Pane>
            </SplitPane>
          </div>
        </Pane>
        <div className="editor-area-right">
          <Bar label="JSON Output" bytes={jsonText.length} title="Shows the comparable JSON output generated from the Internet Object document">
            <div className="toggle-group">
              <label className="toggleSwtich" title="Skip error objects in output">
                <span>Skip Errors in Output</span>
                <Toggle
                  onChange={e => { localStorage.setItem('skipErrors', e.target.checked.toString()); setSkipErrors(e.target.checked); }}
                  checked={skipErrors}
                  aria-label="Toggle skip errors in JSON output"
                />
              </label>
              <label className="toggleSwtich" title="Compress">
                <span>Minify</span>
                <Toggle
                  onChange={e => { localStorage.setItem('minifiedOutput', e.target.checked.toString()); setMinifiedOutput(e.target.checked); }}
                  checked={minifiedOutput}
                  aria-label="Toggle minified JSON output"
                />
              </label>
            </div>
          </Bar>
          <Output
            value={jsonText}
            error={error}
            errorMessages={errorMessages}
            errorItems={errorItems}
            options={{ wordWrap: "on" }}
            onNavigateToError={handleNavigateToError}
            isParsing={isParsing}
          />
        </div>
      </SplitPane>
    </div>
  )
}

export default Playground
