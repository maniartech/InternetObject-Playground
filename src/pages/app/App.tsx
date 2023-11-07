import { useState }   from 'react';
import                     './App.css';
import Header         from '../../components/header/Header';
import Editor         from '../../components/editor/Editor';
import Output         from '../../components/output/Output';
import Footer         from '../../components/footer/Footer';

import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import Toolbar from '../../components/toolbar/Toolbar';
// import Tab from '../../components/tab/Tab';

function App() {
  const [sizes, setSizes] = useState([800, 'auto']);

  const layoutCSS = {
    height: '100%',

  };

  return (
    <div className="App">
      <Header />
      <Toolbar />
      <main className='main'>
          <SplitPane
            split='vertical'
            sizes={sizes}
            onChange={setSizes}
            sashRender={(size: number) => <div className="sash"
            />}
          >
            <Pane minSize={60} maxSize='80%'>
              <div className='left' style={layoutCSS}>
                <Editor />
              </div>
            </Pane>

            <div className='right' style={layoutCSS}>
              <Output />
            </div>

          </SplitPane>
        {/* <Tab tabs={['IO to JSON', 'JSON to IO']}>
        </Tab> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
