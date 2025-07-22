import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import i18n from './i18n';
import App from './App';
import './index.css';
import { CircularProgress, Box } from '@mui/material';

// Ensure i18n is initialized
i18n.on('initialized', () => {
  console.log('i18n initialized successfully');
});

const LoadingScreen = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingScreen />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
