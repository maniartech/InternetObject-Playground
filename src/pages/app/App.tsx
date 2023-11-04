import                     './App.css';
import Header         from '../../components/header/Header';
import Editor         from '../../components/editor/Editor';
import Output         from '../../components/output/Output';
import Footer         from '../../components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='main'>
        <div className='left'>
          <Editor />
        </div>
        <div className='right'>
          <Output />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
