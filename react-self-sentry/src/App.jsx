import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import LaregeRender from './features/sentry-performance/LargeRender';
import LongFetch from './features/sentry-performance/LongFetch';
import TriggerError from './features/sentry-exception/TriggerError';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
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
            </Routes>
        </Router>
    );
}

export default App;
