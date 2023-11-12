import './App.css'
import 'split-pane-react/esm/themes/default.css'

import { useEffect, useState }  from 'react'
import Toggle                   from 'react-toggle'
import SplitPane, { Pane }      from 'split-pane-react'

import Header                   from '../../components/header/Header'
import Editor                   from '../../components/editor/Editor'
import Output                   from '../../components/output/Output'
import Footer                   from '../../components/footer/Footer'
import Tab                      from '../../components/tab/Tab'
import Bar                      from '../../components/bar/Bar'

function App (): JSX.Element {
  // Note: in the following line, the sizes is set with let instead of const
  // this is because somehow, after the setSizes is called, the sizes is not
  // updated immediately, so the next time the handleSchemaChange is called,
  // the sizes is still the old value, so the showSchema is not updated
  // properly. So, we use let to make sure the sizes is updated immediately
  // after the setSizes is called.
  let [sizes, setSizes] = useState([0, 'auto'])
  const [sizes1, setSizes1] = useState([0, 'auto'])
  const [showSchema, setShowSchema] = useState(false)

  useEffect(() => {
    if (sizes1[0] === 0) {
      setSizes1(['60%', 'auto'])
    }
  }, [sizes1])

  const layoutCSS = {
    height: '100%'
  }

  const handleToggleSchema = (): void => {
    setShowSchema(!showSchema)
    if (showSchema) {
      setSizes([0, 'auto'])
    } else {
      setSizes([200, 'auto'])
    }
  }

  const handleOnChange = (s: any): void => {
    sizes = s
    setSizes(s)
  }

  const handleSchemaChange = (): void => {
    if (typeof sizes[0] === 'number') {
      if (sizes[0] <= 100) {
        if (showSchema) {
          setSizes([0, 'auto'])
          setShowSchema(false)
        } else {
          setSizes([200, 'auto'])
          setShowSchema(true)
        }
      } else {
        setShowSchema(sizes[0] > 0)
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <main className='main'>

        <div className='toolbar'>
        <label className='toggle'>
          <span>Show Schema</span>
          <Toggle
            checked={showSchema}
            onChange={handleToggleSchema}
          />
        </label>
          <select name="format" title="Select IO sample data!">
            <option value="" disabled>Hello World!</option>
            <option value="Javascript">Javascript</option>
            <option value="typescript">Typescript</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="python">Python</option>
          </select>
        </div>
        <Tab tabs={['IO to JSON', 'JSON to IO']}>
          <div className='editor-area'>
            <SplitPane
              split='vertical'
              sizes={sizes1}
              onChange={setSizes1}
              sashRender={(size: number) => <div className="sash"
              />}
            >
              <Pane minSize={20} maxSize='80%'>
                <div className='editor-area-left'>
                  <SplitPane
                    split='horizontal'
                    sizes={sizes}
                    onChange={handleOnChange}
                    onDragEnd={handleSchemaChange}
                    sashRender={(size: number) => <div className="sash"
                    />}
                  >
                    <Pane minSize={0}>
                      <div className='top' style={layoutCSS}>
                        <Bar label='Schema'/>
                        <Editor />
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
          <div>
            json to io
          </div>
        </Tab>
      </main>
      <Footer />
    </div>
  )
}

export default App
