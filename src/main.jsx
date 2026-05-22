import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './main.css'
import Login from './pages/Login.jsx';
import Error from './pages/Error.jsx';
import Layout from './pages/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profil from './pages/Profil.jsx';
import Coach from './pages/Coach.jsx';
import { DataProvider } from './providers/ContextData.jsx';
import { CookiesProvider } from 'react-cookie';
import "@fontsource/inter"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/coach-virtuel" element={<Coach />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </DataProvider>
    </CookiesProvider>
  </StrictMode>,
)
