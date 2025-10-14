import React from 'react';
import PropTypes from 'prop-types';

export default function ResponsiveContainer({ children, className = '' }) {
    return (
        <div className={`w-full ${className}`}>
            <div className="w-full">{children}</div>
        </div>
    );
}

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
