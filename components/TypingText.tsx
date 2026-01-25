'use client';
import React, { useState, useEffect } from 'react';

const TypingText = ({ phrases }: { phrases: string[] }) => {
    const [index, setIndex] = useState(0);
    const currentText = phrases[index];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % phrases.length);
        }, 5000); 

        return () => clearInterval(timer);
    }, [phrases.length]);

    return (
        <p className='w-full text-lg/[1] font-medium text-white mb-2 h-7'>
            <span 
                key={currentText}
                style={{ '--chars': currentText.length } as React.CSSProperties}
                className="inline-block overflow-hidden whitespace-nowrap animate-typing transition-all duration-500 ease-in-out"
            >
                {currentText}
            </span>
        </p>
    );
}

export default TypingText;