import { RecoilRoot }                             from 'recoil'
import React                                      from 'react'
import ReactDOM                                   from 'react-dom/client'
import { BrowserRouter as Router }                from 'react-router-dom'
import { Route, Routes, useParams         } from 'react-router-dom'
import App                                        from './pages/app/App'
import AppV2                                      from './pages/v2/AppV2'
import reportWebVitals                            from './reportWebVitals'
import                                                 './styles/index.css'
import                                                 './styles/tailwind.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/v2/*" element={<AppV2 />} />
          <Route path="/:sampleId?" element={<App />} />
        </Routes>
      </RecoilRoot>
    </Router>
  </React.StrictMode>
)
reportWebVitals()
