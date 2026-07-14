import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fontsource-variable/inter';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/:sampleId?" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
