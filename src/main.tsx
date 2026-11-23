import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/nunito-sans/700.css';
import '@fontsource/nunito-sans/800.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import './styles/index.css';
import { App } from './app/App';
import { AppProviders } from './app/AppProviders';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
