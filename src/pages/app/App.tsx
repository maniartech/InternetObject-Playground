import './App.css'
import 'split-pane-react/esm/themes/default.css'

import { useState }  from 'react'
import Toggle                   from 'react-toggle'

import Header                   from '../../components/header/Header'
import Footer                   from '../../components/footer/Footer'
import Tab                      from '../../components/tab/Tab'
import Playground               from '../playgroud/Playground'

function App (): JSX.Element {

  const [showSchema, setShowSchema] = useState(false)

  return (
    <div className="App">
      <Header />
      <main className='main'>

        <div className='toolbar'>
          <label className='toggle'>
            <span>Show Schema</span>
            <Toggle
              checked={showSchema}
              onChange={(v:any) => setShowSchema(v.target.checked)}
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
        <Tab tabs={['IO to JSON']}>
          <Playground showSchema={showSchema} setShowSchema={setShowSchema} />
        </Tab>
      </main>
      <Footer />
    </div>
  )
}

export default App
