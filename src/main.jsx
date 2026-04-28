import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Error from './pages/Error.jsx';
import Layout from './pages/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profil from './pages/Profil.jsx';
import "@fontsource/inter"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" index element={<Dashboard />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
    </Router>
  </StrictMode>,
)
