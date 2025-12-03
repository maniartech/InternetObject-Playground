import { RecoilRoot }                             from 'recoil'
import React                                      from 'react'
import ReactDOM                                   from 'react-dom/client'
import { BrowserRouter as Router }                from 'react-router-dom'
import { Route, Routes }                          from 'react-router-dom'
import App                                        from './pages/app/App'
import reportWebVitals                            from './reportWebVitals'
import                                                 './styles/index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/:sampleId?" element={<App />} />
        </Routes>
      </RecoilRoot>
    </Router>
  </React.StrictMode>
)
reportWebVitals()
