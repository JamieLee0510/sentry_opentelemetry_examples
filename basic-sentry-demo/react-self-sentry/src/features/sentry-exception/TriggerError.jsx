import React, { useState } from 'react';

export default function TriggerError() {
    const [counter, setCounter] = useState(0);
    const clickHandler = () => {
        if (counter > 4) {
            throw new Error('counter > 4 Error');
        }
        setCounter((pre) => pre + 1);
    };
    return (
        <div>
            <h1>TriggerError</h1>
            {counter}
            <button onClick={() => clickHandler()}>add</button>
        </div>
    );
}
