import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AuthProvider } from './state/auth';
import { LanguageProvider } from './contexts/LanguageContext';
import { routes } from './routes/routes';

// This function injects the massive routing file we fixed earlier
function AppRouter() {
  return useRoutes(routes);
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
