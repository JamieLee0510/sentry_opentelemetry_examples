import React, { useState, useEffect } from 'react';

export default function LongLoadComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Hello fetched data');
            }, 10000);
        });
        setIsLoading(true);
        fetchData.then((res) => {
            setData(res);
            setIsLoading(false);
        });
    }, []);

    return <div>{isLoading ? 'loading...' : data}</div>;
}
