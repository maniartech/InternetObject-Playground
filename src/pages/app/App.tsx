import { useState }             from 'react';
import                               'split-pane-react/esm/themes/default.css';
import                               './App.css';
import Header                   from '../../components/header/Header';
import Editor                   from '../../components/editor/Editor';
import Output                   from '../../components/output/Output';
import Footer                   from '../../components/footer/Footer';

import SplitPane, { Pane }      from 'split-pane-react';
import Tab                      from '../../components/tab/Tab';

function App() {
  const [sizes, setSizes] = useState([180, 'auto']);
  const [sizes1, setSizes1] = useState([800, 'auto']);

  const layoutCSS = {
    height: '100%',

  };

  return (
    <div className="App">
      <Header />
      <main className='main'>
        <div className='pretemplate-dropdown'>
          <select name="format">
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
                    onChange={setSizes}
                    sashRender={(size: number) => <div className="sash"
                    />}
                  >
                    <Pane minSize={10} maxSize='40%'>
                      <div className='top' style={layoutCSS}>
                        <div className='bar'>
                          <p>Schema</p>
                        </div>
                        <Editor />
                      </div>
                    </Pane>
                    <div className='bottom' style={layoutCSS}>
                      <div className='bar'>
                        <p>Internet Object</p>
                      </div>
                      <Editor />
                    </div>
                  </SplitPane>
                </div>
              </Pane>
              <div className='editor-area-right'>
                <div className='bar'>
                  <p>JSON</p>
                </div>
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
  );
}

export default App;
