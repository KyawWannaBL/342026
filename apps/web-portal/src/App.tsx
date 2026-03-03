import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import AdminLayout from './components/AdminLayout';

// Pages
import UserControlCenter from './pages/UserControlCenter';
import FleetCommand from './pages/FleetCommand';
import BranchOfficePortal from './pages/BranchOfficePortal';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="approvals" element={<UserControlCenter />} />
            <Route path="fleet" element={<FleetCommand />} />
            <Route path="branch" element={<BranchOfficePortal />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
