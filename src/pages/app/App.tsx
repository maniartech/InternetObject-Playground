import './App.css';

import { useCallback, useEffect, useMemo, useState   } from 'react'
import { useParams                        } from 'react-router-dom';
import Toggle                               from 'react-toggle'

import Header                               from '../../components/header/Header'
import sampleData                           from '../../sample-data'
import Footer                               from '../footer/Footer'
import Playground                           from '../playgroud/Playground'

function App (): JSX.Element {
  const [showSchema, setShowSchema]       = useState(false)
  const [currentDoc, setCurrentDoc]       = useState('')
  const [currentSchema, setCurrentSchema] = useState('')
  const { sampleId }                      = useParams<{ sampleId: string }>()
  const [ sample, setSample ]             = useState(sampleId || "")


  const options = useMemo(() => {
    const options = [
      <option value="" key="select">Select an option</option>,
      <option disabled key="sep">──────────</option>
    ]
    options.push(...sampleData.map((item, index) => (
      <option key={index} value={item.id}>{item.name}</option>
    )))
    return options
  }, [])

  const handleSampleChange = useCallback((e:any) => {
    const sampleId = e.target.value
    const url = `/${sampleId}`
    window.history.pushState({}, '', url)
    setSample(sampleId)
  }, [])

  useEffect(() => {
    const sampleInfo = sampleData.find(item => item.id === sample)
    setCurrentDoc(sampleInfo?.doc || '')
    if (sampleInfo?.schema) {
      setCurrentSchema(sampleInfo.schema)
      setShowSchema(true)
    } else {
      setCurrentSchema('')
      setShowSchema(false)
    }
  }, [sample])

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
            <select
              id="sample-data-selector"
              title="Select IO sample data"
              onChange={handleSampleChange}
              value={sample || ''}
            >
              {options}
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
