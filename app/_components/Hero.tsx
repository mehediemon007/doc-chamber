import React from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
    className?: string
}

const Hero = ({ className} : HeroProps) => {
    return (
        <section className={cn('', className)}>
            <div className="relative h-dvh bg-[url('/hero-banner.webp')] bg-center bg-no-repeat bg-cover">
                <div className="@container">
                    <div>
                        <h1>Where Ambition Meets Real Results</h1>
                    </div>
                </div>
            </div>    
        </section>
    )
}

export default Hero;