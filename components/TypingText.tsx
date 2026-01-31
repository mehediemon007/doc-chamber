'use client';
import React, { useState, useEffect } from 'react';

// *** Import Icons
import { BadgeCheck } from 'lucide-react';

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
        <div className='flex items-center gap-2 w-72 text-white bg-[#ffffff1a] border border-[#8787871f] rounded-[100px] py-2 px-4'>
            <BadgeCheck className='shrink-0'/>
            <span 
                key={currentText}
                style={{ '--chars': currentText.length } as React.CSSProperties}
                className="inline-block overflow-hidden whitespace-nowrap animate-typing transition-all duration-500 ease-in-out"
            >
                {currentText}
            </span>
        </div>
    );
}

export default TypingText;