import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import LaregeRender from './features/sentry-performance/LargeRender';
import LongFetch from './features/sentry-performance/LongFetch';
import TriggerError from './features/sentry-exception/TriggerError';
import { SelfSentry } from './self-sentry/index.jsx';

import './App.css';

SelfSentry.init({ endpoint: 'hihi' });

const SelfSentryRoutes = SelfSentry.reactRouterMetric(Routes);

function App() {
    SelfSentry.test();
    return (
        <Router>
            <SelfSentryRoutes>
                <Route exact path="/" element={<Home />} />
                <Route
                    exact
                    path="/sentry-performance-largerender"
                    element={<LaregeRender />}
                />
                <Route
                    exact
                    path="/sentry-performance-longfetch"
                    element={<LongFetch />}
                />
                <Route
                    exact
                    path="/sentry-exception-01"
                    element={<TriggerError />}
                />
                <Route exact path="/sentry-exception-02" element={<Home />} />
            </SelfSentryRoutes>
        </Router>
    );
}

export default App;
