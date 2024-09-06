import { onLCP, onFCP, onTTFB } from 'web-vitals';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

class SelfSentryInstance {
    init({ endpoint }) {
        this.endpoint = endpoint;
        this._initWindowError();
    }

    _initWindowError() {
        window.onerror = this._reportWindowError;
    }

    _reportWindowError(errorMessage, source, lineno, colno, error) {
        const errorInfo = {
            message: errorMessage,
            source: source,
            line: lineno,
            column: colno,
            stack: error ? error.stack : null,
        };
        console.log('---self sentry catch error:', errorInfo);

        // TODO: send to monitor server
        // 可以用來捕捉到網頁交互的錯誤
        // fetch(this.endpoint, {
        //     method: 'POST',
        //     body: JSON.stringify(errorInfo),
        // });
    }

    reactRouterMetric(RoutesComponent) {
        return ({ children }) => {
            const location = useLocation();
            useEffect(() => {
                onLCP((metric) => this._reportWebVitals('LCP', metric));
                onFCP((metric) => this._reportWebVitals('FCP', metric));
            }, [location]);

            return <RoutesComponent>{children}</RoutesComponent>;
        };
    }

    _reportWebVitals(type, metric) {
        console.log('metric:', metric);
        const metricInfo = {
            type: type,
            value: metric.value,
            delta: metric.delta,
            id: metric.id,
        };
        console.log('metricInfo:', metricInfo);
        // TODO: send to monitor server
    }

    testCheckLocation() {
        const location = useLocation();
        useEffect(() => {
            console.log(location);
        }, []);
    }
}

export const SelfSentry = new SelfSentryInstance();
