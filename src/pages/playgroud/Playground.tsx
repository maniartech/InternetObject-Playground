import { useEffect, useState }            from 'react'
import { useRecoilState }                 from 'recoil'
import { Pane }                           from 'split-pane-react'
import Toggle                             from 'react-toggle'
import SplitPane                          from 'split-pane-react/esm/SplitPane'

import Bar                                from '../../components/bar/Bar'
import Editor                             from '../../components/editor/Editor'
import Output                             from '../../components/output/Output'
import parseIO                            from './compiler'
import editorPosition                     from '../../states/editor-pos'

import                                         'split-pane-react/esm/themes/default.css'

const Playground = ({ showSchema, setShowSchema, document, schema }: any) => {
  // const monaco = useMonaco()
  const [_, setEditorPos] = useRecoilState(editorPosition)

  // Note: 'sizesH' is declared with 'let' instead of 'const'. This is needed
  // because somehow 'sizesH' does not update immediately after 'setHSizes' is
  // called. When 'handleSchemaBar' is called again, 'sizesH' shows old value,
  // preventing correct 'showSchema' updates. Using 'let' ensures 'sizesH' is
  // updated right after 'setHSizes' is executed.
  let   [sizesH, setHSizes]             = useState([0, "auto"])
  const [sizesV, setVSizes]             = useState([0, "auto"])
  const [schemaText, setSchemaText]     = useState(schema)
  const [documentText, setDocumentText] = useState(document)
  const [jsonText, setJsonText]         = useState("")
  const [markers, setMarkers]           = useState<any[]>([])
  const [defMarkers, setDefMarkers]     = useState<any[]>([])
  const [minifiedOutput, setMinifiedOutput] = useState(localStorage.getItem("minifiedOutput") === "true" ? true : false)

  const parse = () => {
    const result = parseIO(documentText, showSchema ? schemaText : null)
    if (result.defsMarkers) {
      setDefMarkers(result.defsMarkers)
    } else {
      setDefMarkers([])
    }

    if (result.docMarkers) {
      setMarkers(result.docMarkers)
    } else {
      setMarkers([])
    }

    if (result.output) {
      const output = JSON.stringify(result.output, null, minifiedOutput ? 0 : 2)
      setJsonText(output)
    } else {
      setJsonText(result.errorMessage || "")
    }
  }

  useEffect(() => {
    setMinifiedOutput(minifiedOutput)
  }, [minifiedOutput])

  useEffect(() => {
    parse()
  }, [schemaText, documentText, showSchema, minifiedOutput])

  useEffect(() => {
    setSchemaText(schema)
    setDocumentText(document)
  }, [schema, document])

  useEffect(() => {
    if (sizesV[0] === 0) {
      setVSizes(["60%", "auto"])
    }
  }, [sizesV])

  useEffect(() => {
    // setShowSchema(!showSchema)
    if (!showSchema) {
      setHSizes([0, "auto"])
    } else {
      setHSizes([200, "auto"])
    }
  }, [showSchema])

  const layoutCSS = {
    height: "100%",
  }

  const handleHBarDragEnd = (): void => {
    if (typeof sizesH[0] === "number") {
      if (sizesH[0] <= 100) {
        if (showSchema) {
          setHSizes([0, "auto"])
          setShowSchema(false)
        } else {
          setHSizes([200, "auto"])
          setShowSchema(true)
        }
      } else {
        setShowSchema(sizesH[0] > 0)
      }
    }
  }

  const handleHBar = (s: any): void => {
    sizesH = s
    setHSizes(s)
  }

  const handleSchemaChange = (value: string): void => {
    setSchemaText(value)
  }

  const handleIOChange = (value: string): void => {
    setDocumentText(value)
  }

  const handleCaretPositionChange = (name: string, position: any): void => {
    setEditorPos({
      editorName: name,
      row: position.row,
      column: position.column,
      position: position.position
    })
  }

  const handleOnCompressChange = (event: any): void => {
    localStorage.setItem("minifiedOutput", event.target.checked)
    setMinifiedOutput(event.target.checked)
  }

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
                  <Bar label="Schema" bytes={schemaText.length} />
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
                  <Bar label="Internet Object" bytes={documentText.length} outputBytes={jsonText.length} minified={minifiedOutput} />
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
              <Toggle onChange={handleOnCompressChange} checked={minifiedOutput} />
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
