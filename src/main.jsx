import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './main.css'
import Login from './pages/Login.jsx';
import Error from './pages/Error.jsx';
import Layout from './pages/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NewDashboard from './pages/NewDashboard.jsx';
import Profil from './pages/Profil.jsx';
import { DataProvider } from './providers/ContextData.jsx';
import "@fontsource/inter"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" index element={<Dashboard />} />
              <Route path="/newdashboard" index element={<NewDashboard />} />

              <Route path="/profil" element={<Profil />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </DataProvider>
    </Router>
  </StrictMode>,
)
