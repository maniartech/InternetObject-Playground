import './App.css';

import { useCallback, useEffect, useMemo, useState   } from 'react'
import { useParams                        } from 'react-router-dom';
import Toggle                               from 'react-toggle'

import Header                               from '../../components/header/Header'
import sampleData                           from '../../sample-data'
import { SampleOptionItem                 } from '../../sample-data/sample-options';
import Footer                               from '../footer/Footer'
import Playground                           from '../playgroud/Playground'

function App (): JSX.Element {
  const [currentDoc, setCurrentDoc]       = useState('')
  const [currentSchema, setCurrentSchema] = useState('')
  const { sampleId }                      = useParams<{ sampleId: string }>()

  const [ sample, setSample ]             = useState(sampleData.find(sampleId || ""))
  const [showSchema, setShowSchema]       = useState(false)

  const options = useMemo(() => {
    const options = [
      <option value="" key="select">Blank</option>
    ]

    for (let i=0; i<sampleData.groups.length; i++) {
      const group = sampleData.groups[i]
      const groupOptions:any = []
      for (let j=0; j<group.items.length; j++) {
        const item = group.items[j]
        groupOptions.push(<option key={item.id} value={item.id}>{item.name}</option>)
      }

      options.push(
        <optgroup key={i} label={group.group}>
          {groupOptions}
        </optgroup>
      )
    }

    return options
  }, [])

  const handleSampleChange = useCallback((e:any) => {
    const sampleId = e.target.value
    const sample = { ...sampleData.find(sampleId) } as SampleOptionItem
    const url = `/${sampleId}`
    window.history.pushState({}, '', url)
    setSample(sample)
  }, [])

  useEffect(() => {
    setCurrentDoc(sample?.doc || '')
    if (sample?.schema) {
      setCurrentSchema(sample.schema)
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
              className="highlight"
              title="Select IO sample data"
              onChange={handleSampleChange}
              value={sample?.id || ''}
            >
              {options}
            </select>
          </div>
        </Header>
        <main className='main'>
          <Playground showSchema={showSchema} schemaPanelHeight={sample?.schemaPanelHeight} setShowSchema={setShowSchema} document={currentDoc} schema={currentSchema} />
        </main>
        <Footer />
      </div>
  )
}

export default App
