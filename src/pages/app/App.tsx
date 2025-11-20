import './App.css';

import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Toggle                               from 'react-toggle'
import LZString                             from 'lz-string';

import Header                               from '../../components/header/Header'
import sampleData                           from '../../sample-data'
import Footer                               from '../footer/Footer'
import Playground                           from '../playgroud/Playground'
import WelcomeNotification                  from '../../components/welcome-notification/WelcomeNotification'
import ShareDialog                          from '../../components/share-dialog/ShareDialog';
import WarningDialog                        from '../../components/warning-dialog/WarningDialog';

function App (): JSX.Element {
  const { sampleId } = useParams<{ sampleId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [warningDialog, setWarningDialog] = useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

  // Track the previous sampleId to detect navigation vs refresh
  const prevSampleIdRef = useRef<string | undefined>(sampleId);

  // Initialize state from URL (query params), Session Storage, or sample data
  const [sample, setSample] = useState(() => {
    const sharedDoc = searchParams.get('d');
    if (sharedDoc) return null;
    return sampleData.find(sampleId || "");
  });

  const [document, setDocument] = useState(() => {
    const sharedDoc = searchParams.get('d');
    if (sharedDoc) return LZString.decompressFromEncodedURIComponent(sharedDoc) || '';

    // Check session storage first (if it matches the current sample context)
    const sessionSampleId = sessionStorage.getItem('io-playground-sample-id');
    const sessionDoc = sessionStorage.getItem('io-playground-doc');

    // If we have session data and it matches the current URL sampleId (or both are empty/root)
    if (sessionDoc !== null && (sessionSampleId === (sampleId || ''))) {
      return sessionDoc;
    }

    return sample?.doc || '';
  });

  const [schema, setSchema] = useState(() => {
    const sharedSchema = searchParams.get('s');
    if (sharedSchema) return LZString.decompressFromEncodedURIComponent(sharedSchema) || '';

    const sessionSampleId = sessionStorage.getItem('io-playground-sample-id');
    const sessionSchema = sessionStorage.getItem('io-playground-schema');

    if (sessionSchema !== null && (sessionSampleId === (sampleId || ''))) {
      return sessionSchema;
    }

    return sample?.schema || '';
  });

  const [showSchema, setShowSchema] = useState(() => {
    const sharedSep = searchParams.get('sep');
    if (sharedSep !== null) return sharedSep === 'true';

    const sessionSampleId = sessionStorage.getItem('io-playground-sample-id');
    const sessionShowSchema = sessionStorage.getItem('io-playground-show-schema');

    if (sessionShowSchema !== null && (sessionSampleId === (sampleId || ''))) {
      return sessionShowSchema === 'true';
    }

    return !!sample?.schema;
  });

  const [minifiedOutput, setMinifiedOutput] = useState(() => {
    const sharedMin = searchParams.get('min');
    if (sharedMin !== null) return sharedMin === 'true';
    return localStorage.getItem('minifiedOutput') === 'true';
  });

  const [skipErrors, setSkipErrors] = useState(() => {
    const sharedSkip = searchParams.get('skip');
    if (sharedSkip !== null) return sharedSkip === 'true';
    return localStorage.getItem('skipErrors') !== 'false';
  });

  const [hasVisited, setHasVisited] = useState(() => {
    return localStorage.getItem('io-playground-visited') === 'true';
  });

  // Persist to Session Storage
  useEffect(() => {
    // Only save if we are not in "shared" mode (no query params)
    const d = searchParams.get('d');
    if (!d) {
      sessionStorage.setItem('io-playground-sample-id', sampleId || '');
      sessionStorage.setItem('io-playground-doc', document);
      sessionStorage.setItem('io-playground-schema', schema);
      sessionStorage.setItem('io-playground-show-schema', String(showSchema));
    }
  }, [document, schema, showSchema, sampleId, searchParams]);

  // Effect to handle sampleId changes (navigation)
  useEffect(() => {
    const d = searchParams.get('d');
    const s = searchParams.get('s');

    if (!d && !s) {
      // Only reset if the sampleId actually CHANGED (navigation), not on initial render/refresh
      if (sampleId !== prevSampleIdRef.current) {
        const found = sampleData.find(sampleId || "");
        setSample(found);
        setDocument(found?.doc || '');
        setSchema(found?.schema || '');
        setShowSchema(!!found?.schema);
        prevSampleIdRef.current = sampleId;
      }
    }
  }, [sampleId, searchParams]);

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
    setDocument(found?.doc || '');
    setSchema(found?.schema || '');
    // Clear query params when selecting a sample
    setSearchParams({});
    navigate(`/${newSampleId}`);
  }, [navigate, setSearchParams]);

  const handleWelcomeClose = useCallback(() => {
    setHasVisited(true);
  }, []);

  const isDirty = useMemo(() => {
    const initialDoc = sample?.doc || '';
    const initialSchema = sample?.schema || '';
    const initialShowSchema = !!sample?.schema;

    return (
      document !== initialDoc ||
      schema !== initialSchema ||
      showSchema !== initialShowSchema
    );
  }, [document, schema, showSchema, sample]);

  const handleReset = useCallback(() => {
    // Clear session storage
    sessionStorage.removeItem('io-playground-sample-id');
    sessionStorage.removeItem('io-playground-doc');
    sessionStorage.removeItem('io-playground-schema');
    sessionStorage.removeItem('io-playground-show-schema');

    // Reset to current sample
    const found = sampleData.find(sampleId || "");
    setSample(found);
    setDocument(found?.doc || '');
    setSchema(found?.schema || '');
    setShowSchema(!!found?.schema);

    // Also clear query params if any (effectively resetting to clean sample state)
    setSearchParams({});
  }, [sampleId, setSearchParams]);

  const handleShare = useCallback(() => {
    if (!document.trim() && !schema.trim()) {
      setWarningDialog({
        isOpen: true,
        message: "There is no content to share! Please add some data or schema before sharing."
      });
      return;
    }

    const compressedDoc = LZString.compressToEncodedURIComponent(document);
    const compressedSchema = LZString.compressToEncodedURIComponent(schema);
    const sep = showSchema ? 'true' : 'false';
    const min = minifiedOutput ? 'true' : 'false';
    const skip = skipErrors ? 'true' : 'false';

    const newParams = { d: compressedDoc, s: compressedSchema, sep, min, skip };

    // Construct full URL pointing to root
    const url = new URL(window.location.origin + '/');
    url.search = new URLSearchParams(newParams).toString();

    setShareUrl(url.toString());
    setIsShareDialogOpen(true);
  }, [document, schema, showSchema, minifiedOutput, skipErrors]);

  return (
    <div className="app">
      <WelcomeNotification onClose={handleWelcomeClose} />
      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        url={shareUrl}
        showSchema={showSchema}
        minifiedOutput={minifiedOutput}
        skipErrors={skipErrors}
      />
      <WarningDialog
        isOpen={warningDialog.isOpen}
        onClose={() => setWarningDialog({ ...warningDialog, isOpen: false })}
        message={warningDialog.message}
        title="Nothing to Share"
      />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header>
        <div className='toolbar'>
          <button className="share-btn" onClick={handleShare} title="Share Code">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>Share</span>
          </button>
          <label className='toggle' title="Separate the schema from the data document!">
            <span>Separate Schema</span>
            <Toggle
              checked={showSchema}
              onChange={e => setShowSchema(e.target.checked)}
            />
          </label>
          <div className="sample-group">
            <select
              id="sample-data-selector"
              className={hasVisited ? '' : 'highlight'}
              title="Select IO sample data"
              onChange={handleSampleChange}
              value={sample?.id || ''}
            >
              {options}
            </select>
            <button
              className="reset-btn"
              onClick={handleReset}
              title={isDirty ? "Reset to Sample Data" : "No changes to reset. Use this button when you have made changes to the document or schema."}
              disabled={!isDirty}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>
          </div>
        </div>
      </Header>
      <main id="main-content" className='main'>
        <Playground
          showSchema={showSchema}
          schemaPanelHeight={sample?.schemaPanelHeight}
          setShowSchema={setShowSchema}
          document={document}
          setDocument={setDocument}
          schema={schema}
          setSchema={setSchema}
          minifiedOutput={minifiedOutput}
          setMinifiedOutput={setMinifiedOutput}
          skipErrors={skipErrors}
          setSkipErrors={setSkipErrors}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App
