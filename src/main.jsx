import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home.jsx';
import Error from './pages/Error.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
    </Router>
  </StrictMode>,
)
