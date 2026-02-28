import React from 'react';

const BackgroundBlobs = ({ variant = 'default' }) => {
    if (variant === 'security') {
        return (
            <>
                <div className="blob blob-1 blob-security blob-security-1 rounded-full bg-emerald-500"></div>
                <div className="blob blob-2 blob-security blob-security-2 rounded-full bg-emerald-600"></div>
            </>
        );
    }

    // Default variants (Home, etc)
    return (
        <>
            <div className="blob blob-1 rounded-full bg-indigo-600"></div>
            <div className="blob blob-2 rounded-full bg-pink-500"></div>
            <div className="blob blob-3 rounded-full bg-cyan-500"></div>
        </>
    );
};

export default BackgroundBlobs;
