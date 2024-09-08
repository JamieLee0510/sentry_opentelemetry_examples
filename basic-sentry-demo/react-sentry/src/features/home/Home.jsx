import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link to={'/sentry-performance-largerender'}>Larege Render</Link>
            &nbsp;|&nbsp;
            <Link to={'/sentry-performance-longfetch'}>Long Fetch</Link>
        </div>
    );
}
