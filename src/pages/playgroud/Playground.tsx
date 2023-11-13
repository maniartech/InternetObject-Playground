import { useEffect, useState } from "react";
import { Pane } from "split-pane-react";
import SplitPane from "split-pane-react/esm/SplitPane";
import Editor from "../../components/editor/Editor";
import Bar from "../../components/bar/Bar";
import Output from "../../components/output/Output";


const Playground = ({showSchema, setShowSchema}:any) => {

  // Note: 'sizesH' is declared with 'let' instead of 'const'. This is needed
  // because 'sizesH' does not update immediately after 'setHSizes' is called.
  // When 'handleSchemaChange' is called again, 'sizesH' holds its old value,
  // preventing correct 'showSchema' updates. Using 'let' ensures 'sizesH' is
  // updated right after 'setHSizes' is executed.
  let [sizesH, setHSizes] = useState([0, 'auto'])
  const [sizesV, setVSizes] = useState([0, 'auto'])

  useEffect(() => {
    if (sizesV[0] === 0) {
      setVSizes(['60%', 'auto'])
    }
  }, [sizesV])

  useEffect(() => {
    // setShowSchema(!showSchema)
    if (!showSchema) {
      setHSizes([0, 'auto'])
    } else {
      setHSizes([200, 'auto'])
    }
  }, [showSchema])

  const layoutCSS = {
    height: '100%'
  }

  const handleSchemaChange = (): void => {
    if (typeof sizesH[0] === 'number') {
      if (sizesH[0] <= 100) {
        if (showSchema) {
          setHSizes([0, 'auto'])
          setShowSchema(false)
        } else {
          setHSizes([200, 'auto'])
          setShowSchema(true)
        }
      } else {
        setShowSchema(sizesH[0] > 0)
      }
    }
  }

  const handleOnHScplitterChange = (s:any): void => {
    sizesH = s
    setHSizes(s)
  }

  return (
    <div className='editor-area'>
      <SplitPane
        split='vertical'
        sizes={sizesV}
        onChange={setVSizes}
        sashRender={(size: number) => <div className="sash"
        />}
      >
        <Pane minSize={20} maxSize='80%'>
          <div className='editor-area-left'>
            <SplitPane
              split='horizontal'
              sizes={sizesH}
              onChange={handleOnHScplitterChange}
              onDragEnd={handleSchemaChange}
              sashRender={(size: number) => <div className="sash"
              />}
            >
              <Pane minSize={0}>
                <div className='top' style={layoutCSS}>
                  <Bar label='Schema'/>
                  <Editor onChange={handleSchemaChange} />
                </div>
              </Pane>
              <Pane minSize={200}>
                <div className='bottom' style={layoutCSS}>
                  <Bar label='Internet Object'/>
                  <Editor />
                </div>
              </Pane>
            </SplitPane>
          </div>
        </Pane>
        <div className='editor-area-right'>
          <Bar label='JSON' bgColor='#dd444a'/>
          <Output />
        </div>
      </SplitPane>
    </div>
  )
}

export default Playground;
