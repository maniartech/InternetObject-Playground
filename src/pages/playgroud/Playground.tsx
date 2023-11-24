import { useCallback, useEffect, useState } from 'react';
import { Pane } from 'split-pane-react';
import SplitPane from 'split-pane-react/esm/SplitPane';

import { useMonaco } from '@monaco-editor/react';

import Bar from '../../components/bar/Bar';
import Editor from '../../components/editor/Editor';
import Output from '../../components/output/Output';
import { parseIO } from './compiler';

const Playground = ({ showSchema, setShowSchema, document, schema }: any) => {
  // const monaco = useMonaco();

  // Note: 'sizesH' is declared with 'let' instead of 'const'. This is needed
  // because somehow 'sizesH' does not update immediately after 'setHSizes' is
  // called. When 'handleSchemaBar' is called again, 'sizesH' shows old value,
  // preventing correct 'showSchema' updates. Using 'let' ensures 'sizesH' is
  // updated right after 'setHSizes' is executed.
  let [sizesH, setHSizes] = useState([0, "auto"]);
  const [sizesV, setVSizes] = useState([0, "auto"]);
  const [schemaText, setSchemaText] = useState(schema);
  const [documentText, setDocumentText] = useState(document);
  const [jsonText, setJsonText] = useState("");

  const parse = useCallback((value: string) => {
    const json = parseIO(value.trim(), null);
    setJsonText(json);
  }, []);

  useEffect(() => {
    parse(documentText);
  }, []);

  useEffect(() => {
    setSchemaText(schema);
    setDocumentText(document);
  }, [schema, document]);

  useEffect(() => {
    if (sizesV[0] === 0) {
      setVSizes(["60%", "auto"]);
    }
  }, [sizesV]);

  useEffect(() => {
    // setShowSchema(!showSchema)
    if (!showSchema) {
      setHSizes([0, "auto"]);
    } else {
      setHSizes([200, "auto"]);
    }
  }, [showSchema]);

  const layoutCSS = {
    height: "100%",
  };

  const handleHBarDragEnd = (): void => {
    if (typeof sizesH[0] === "number") {
      if (sizesH[0] <= 100) {
        if (showSchema) {
          setHSizes([0, "auto"]);
          setShowSchema(false);
        } else {
          setHSizes([200, "auto"]);
          setShowSchema(true);
        }
      } else {
        setShowSchema(sizesH[0] > 0);
      }
    }
  };

  const handleHBar = (s: any): void => {
    sizesH = s;
    setHSizes(s);
  };

  const handleSchemaChange = (value: string): void => {};

  const handleIOChange = (value: string): void => {
    const json: string = parseIO(value.trim(), null);
    setJsonText(json);
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
              onChange={handleHBar}
              onDragEnd={handleHBarDragEnd}
              sashRender={(size: number) => <div className="sash" />}
            >
              <Pane minSize={0}>
                <div className="top" style={layoutCSS}>
                  <Bar label="Schema" />
                  <Editor onChange={handleSchemaChange} value={schemaText} />
                </div>
              </Pane>
              <Pane minSize={200}>
                <div className="bottom" style={layoutCSS}>
                  <Bar label="Internet Object" />
                  <Editor onChange={handleIOChange} value={documentText} />
                </div>
              </Pane>
            </SplitPane>
          </div>
        </Pane>
        <div className="editor-area-right">
          <Bar label="JSON" bgColor="#dd444a" />
          <Output value={jsonText} options={{
            wordWrap: "on"
          }} />
        </div>
      </SplitPane>
    </div>
  );
};

export default Playground;
