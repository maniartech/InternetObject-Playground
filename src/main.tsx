import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fontsource-variable/inter';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { printConsoleBanner } from './console-banner';

printConsoleBanner();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/:sampleId?" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
