import React from 'react';

export default function ResponsiveContainer({ children, className = '' }) {
    // Full-bleed container: no horizontal padding and no max-width so children can span edge-to-edge.
    return (
        <div className={`w-full ${className}`}>
            <div className="w-full">{children}</div>
        </div>
    );
}
