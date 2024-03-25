import { useCallback, useMemo, useState }                   from 'react'
import Toggle                                               from 'react-toggle'

import                                                           './App.css'
import Playground                                           from '../playgroud/Playground'
import Footer                                               from '../footer/Footer'
import Header                                               from '../../components/header/Header'
import sampleData                                           from '../../sample-data'

function App (): JSX.Element {
  const [showSchema, setShowSchema]       = useState(false)
  const [currentDoc, setCurrentDoc]       = useState('')
  const [currentSchema, setCurrentSchema] = useState('')

  const options = useMemo(() => {
    const options = [
      <option value="" key="select">Select an option</option>,
      <option disabled key="sep">──────────</option>
    ]
    options.push(...sampleData.map((item, index) => (
      <option key={index} value={item.name}>{item.name}</option>
    )))
    return options
  }, [])

  const handleSampleChange = useCallback((e:any) => {
    const sample = sampleData.find(item => item.name === e.target.value)
    setCurrentDoc(sample?.doc || '')
    if (sample?.schema) {
      setCurrentSchema(sample.schema)
      setShowSchema(true)
    } else {
      setCurrentSchema('')
      setShowSchema(false)
    }
  }, [])

  return (
      <div className="app">
        <Header>
          <div className='toolbar'>
            <label className='toggle' title="Separate the schema from the data document!">
              <span>Separate Schema</span>
              <Toggle
                checked={showSchema}
                onChange={(v:any) => setShowSchema(v.target.checked)}
              />
            </label>
            <select id="sample-data-selector"
            title="Select IO sample data"
            onChange={ handleSampleChange }>
              { options }
            </select>
          </div>
        </Header>
        <main className='main'>
          <Playground showSchema={showSchema} setShowSchema={setShowSchema} document={currentDoc} schema={currentSchema} />
        </main>
        <Footer />
      </div>
  )
}

export default App
