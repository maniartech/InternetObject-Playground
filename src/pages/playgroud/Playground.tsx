import 'split-pane-react/esm/themes/default.css';

import { Decimal }        from 'internet-object';
import { useCallback, useEffect, useRef, useState } from 'react';
import Toggle             from 'react-toggle';
import { useRecoilState } from 'recoil';
import { Pane }           from 'split-pane-react';
import SplitPane          from 'split-pane-react/esm/SplitPane';

import Bar            from '../../components/bar/Bar';
import Editor         from '../../components/editor/Editor';
import Output         from '../../components/output/Output';
import editorPosition from '../../states/editor-pos';
import { useParseIO, Marker } from '../../hooks/useParseIO';

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
  const [jsonText, setJsonText] = useState<string>('');
  const [minifiedOutput, setMinifiedOutput] = useState<boolean>(localStorage.getItem('minifiedOutput') === 'true');
  // Use custom hook for parsing logic and marker state
  const { markers, defMarkers, jsonText: parsedJsonText, error, parse } = useParseIO(documentText, schemaText, showSchema, minifiedOutput);


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
  }, [schemaText, documentText, showSchema, minifiedOutput, parse]);

  // Keep jsonText in sync with parsedJsonText
  useEffect(() => {
    setJsonText(parsedJsonText);
  }, [parsedJsonText]);

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

  const layoutCSS = { height: "100%" }


  // Handlers with useCallback for stable references
  const handleHBarDragEnd = useCallback((): void => {
    const currentSizesH = sizesHRef.current;
    if (typeof currentSizesH[0] === 'number') {
      if (currentSizesH[0] <= MIN_PANEL_SIZE) {
        if (showSchema) {
          setHSizes([0, 'auto']);
          setShowSchema(false);
        } else {
          setHSizes([DEFAULT_SCHEMA_PANEL_HEIGHT, 'auto']);
          setShowSchema(true);
        }
      } else {
        setShowSchema(currentSizesH[0] > 0);
      }
    }
  }, [showSchema, setShowSchema]);

  const handleHBar = useCallback((s: [number | string, string]): void => {
    setHSizes(s);
    // sizesHRef will be updated by the useEffect above
  }, []);

  const handleSchemaChange = useCallback((value: string): void => {
    setSchemaText(value);
  }, []);

  const handleIOChange = useCallback((value: string): void => {
    setDocumentText(value);
  }, []);

  const handleCaretPositionChange = useCallback((name: string, position: any): void => {
    setEditorPos({
      editorName: name,
      row: position.row,
      column: position.column,
      position: position.position,
    });
  }, [setEditorPos]);

  const handleOnCompressChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    localStorage.setItem('minifiedOutput', event.target.checked.toString());
    setMinifiedOutput(event.target.checked);
  }, []);

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
              onChange={handleHBar}
              onDragEnd={handleHBarDragEnd}
              sashRender={(size: number) => <div className="sash" />}
            >
              <Pane minSize={0}>
                <div className="top" style={layoutCSS}>
                  <Bar label="Schema & Definitions" bytes={schemaText.length} />
                  <Editor
                    onChange={handleSchemaChange}
                    value={schemaText}
                    markers={defMarkers}
                    onChangeCaretPosition={(pos) => {
                      handleCaretPositionChange("Definitions", pos)
                    }}
                  />
                </div>
              </Pane>
              <Pane minSize={200}>
                <div className="bottom" style={layoutCSS}>
                  <Bar label="Internet Object Document" bytes={documentText.length} outputBytes={jsonText.length} minified={minifiedOutput} isError={error} />
                  <Editor
                    value={documentText}
                    markers={markers}
                    onChange={handleIOChange}
                    onChangeCaretPosition={(pos) => {
                      handleCaretPositionChange("Internet Object", pos)
                    }}
                  />
                </div>
              </Pane>
            </SplitPane>
          </div>
        </Pane>
        <div className="editor-area-right">
          <Bar label="JSON Output" bytes={jsonText.length}>
            <label className="toggleSwtich" title="Compress">
              <span>Minify</span>
              <Toggle
                onChange={handleOnCompressChange}
                checked={minifiedOutput}
                aria-label="Toggle minified JSON output"
              />
            </label>
          </Bar>
          <Output value={jsonText} options={{
            wordWrap: "on"
          }} />
        </div>
      </SplitPane>
    </div>
  )
}

export default Playground
