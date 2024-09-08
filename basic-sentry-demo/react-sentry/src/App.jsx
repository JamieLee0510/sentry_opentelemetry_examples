import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './features/home/Home';
import LaregeRender from './features/sentry-performance/LargeRender';
import LongFetch from './features/sentry-performance/LongFetch';
import TriggerError from './features/sentry-exception/TriggerError';
import { SentryRoutes } from './utils/sentry';

function App() {
    return (
        <Router>
            <SentryRoutes>
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
            </SentryRoutes>
        </Router>
    );
}

export default App;
