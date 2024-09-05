import React from 'react';

const mockItems = Array.from({ length: 100000 }, (_, i) => `Item ${i}`);

export default function LargeRender() {
    return (
        <div>
            LargeRender
            <ul>
                {mockItems.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
        </div>
    );
}
