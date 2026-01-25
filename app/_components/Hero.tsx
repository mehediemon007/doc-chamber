import React from 'react';
import { cn } from '@/lib/utils';
import TypingText from '@/components/TypingText';
import BookingForm from './BookingForm';

interface HeroProps {
    className?: string
}

const Hero = ({ className} : HeroProps) => {

    const words = ['Level Up Today', 'The Power to Achieve', 'Rise with Purpose'];

    return (
        <section className={cn('', className)}>
            <div className="relative min-h-dvh bg-[url('/hero-banner.webp')] bg-center bg-no-repeat bg-cover">
                <div className="container">
                    <div className='flex justify-between items-center pt-50 pb-12.5'>
                        <div className='w-[34%]'>
                            <TypingText phrases={words}/>
                            <h1>Where Ambition Meets Real Results</h1>
                            <p className='text-xl text-white text-shadow-[0_0_5px_rgba(0,0,0,0.5)] my-8'>Trusted, patient first healthcare advanced diagnostics, personalized treatment plans, and compassionate follow up care.</p>
                            <button className='btn-default'>
                                Get A Quote
                            </button>
                        </div>
                        <div className='w-1/4'>
                            <BookingForm/>
                        </div>
                    </div>
                </div>
            </div>    
        </section>
    )
}

export default Hero;