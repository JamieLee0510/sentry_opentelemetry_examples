import { onCLS, onINP, onLCP } from 'web-vitals';
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

        // 可以用來捕捉到網頁交互的錯誤
        // fetch(this.endpoint, {
        //     method: 'POST',
        //     body: JSON.stringify(errorInfo),
        // });
    }

    // TODO: web vitals
    reactRouterMetric(RoutesComponent) {
        return ({ children }) => {
            const location = useLocation();
            useEffect(() => {
                console.log(location);
            }, [location]);

            return <RoutesComponent>{children}</RoutesComponent>;
        };
    }

    test() {
        const location = useLocation();
        useEffect(() => {
            console.log(location);
        }, []);
    }
}

export const SelfSentry = new SelfSentryInstance();
