import './App.css';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate           } from 'react-router-dom';
import Toggle                               from 'react-toggle'

import Header                               from '../../components/header/Header'
import sampleData                           from '../../sample-data'
import Footer                               from '../footer/Footer'
import Playground                           from '../playgroud/Playground'
import WelcomeNotification                  from '../../components/welcome-notification/WelcomeNotification'

function App (): JSX.Element {
  const { sampleId } = useParams<{ sampleId: string }>();
  const navigate = useNavigate();
  const [sample, setSample] = useState(() => sampleData.find(sampleId || ""));
  const [showSchema, setShowSchema] = useState(!!sample?.schema);
  const [hasVisited, setHasVisited] = useState(() => {
    return localStorage.getItem('io-playground-visited') === 'true';
  });

  const options = useMemo(() => [
    <option value="" key="select">Blank</option>,
    ...sampleData.groups.map((group, i) => (
      <optgroup key={i} label={group.group}>
        {group.items.map(item => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </optgroup>
    ))
  ], []);

  const handleSampleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSampleId = e.target.value;
    const found = sampleData.find(newSampleId);
    setSample(found);
    setShowSchema(!!found?.schema);
    navigate(`/${newSampleId}`);
  }, [navigate]);

  const handleWelcomeClose = useCallback(() => {
    setHasVisited(true);
  }, []);

  // Keep showSchema in sync if sample changes (e.g. via back/forward navigation)
  // but do not override user toggling
  // (If you want to always auto-toggle, uncomment below)
  // useEffect(() => { setShowSchema(!!sample?.schema); }, [sample]);

  return (
    <div className="app">
      <WelcomeNotification onClose={handleWelcomeClose} />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header>
        <div className='toolbar'>
          <label className='toggle' title="Separate the schema from the data document!">
            <span>Separate Schema</span>
            <Toggle
              checked={showSchema}
              onChange={e => setShowSchema(e.target.checked)}
            />
          </label>
          <select
            id="sample-data-selector"
            className={hasVisited ? '' : 'highlight'}
            title="Select IO sample data"
            onChange={handleSampleChange}
            value={sample?.id || ''}
          >
            {options}
          </select>
        </div>
      </Header>
      <main id="main-content" className='main'>
        <Playground
          showSchema={showSchema}
          schemaPanelHeight={sample?.schemaPanelHeight}
          setShowSchema={setShowSchema}
          document={sample?.doc || ''}
          schema={sample?.schema || ''}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App
