import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

// Data Validation
import { validateDataStore } from './schemas/index.js';
import { phases } from './data/enforcementTimeline.js';
import { rules } from './data/rulesStructure.js';
import { definitions } from './data/definitions.js';
import { sections } from './data/actStructure.js';

// Run validation
validateDataStore({ phases, rules, definitions, sections });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
