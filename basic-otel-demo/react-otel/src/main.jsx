import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { startOtelInstrumentation } from './utils/otel.js';
import './index.css';

startOtelInstrumentation();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
