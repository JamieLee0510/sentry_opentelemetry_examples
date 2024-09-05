import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './index.css';

// import * as Sentry from '@sentry/react';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
