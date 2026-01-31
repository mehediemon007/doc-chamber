import React from 'react';
import TypingText from '@/components/TypingText';

import { cn } from '@/lib/utils';

// *** Import Icons
import { CalendarPlus2 } from 'lucide-react';

interface HeroProps {
    className?: string
}

const Hero = ({ className} : HeroProps) => {

    const words = ['Patient-Centered Healthcare', 'Level Up Today', 'Rise with Purpose'];

    return (
        <section className={cn('', className)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="col-span-1 flex flex-col gap-28 bg-radial-[at_center_left,#016273,#00778C] py-12 px-5 sm:p-15.5 overlay before:bg-[url('/hero-bg.png')] before:bg-center before:bg-no-repeat">
                    <div className='flex justify-end'>
                        <div className='w-full sm:w-150 space-y-8'>
                            <div className='space-y-4'>
                                <TypingText phrases={words}/>
                                <h1>Reliable Healthcare for You and Your Family</h1>
                            </div>
                            <p className='max-w-126.5 text-lg text-white'>Clinara Provides professional medical care with a focus on patient safety, clear communication, and modern treatment facilities. Our team of qualified doctors is here to support your health at every stage of life.</p>
                            <button className='btn btn-default btn-secondary'>
                                <CalendarPlus2/>
                                <span>Book an Appointment</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className='flex w-full sm:w-150 gap-6 sm:gap-20'>
                            <div className='text-white'>
                                <h2 className=''>
                                    <span>120</span>+
                                </h2>
                                <p className=''>Patient Consultations</p>
                            </div>
                            <div className='text-white'>
                                <h2 className=''>
                                    <span>12</span>+
                                </h2>
                                <p className=''>Years of Clinical Experience</p>
                            </div>
                            <div className='text-white'>
                                <h2 className=''>
                                    <span>90</span>%
                                </h2>
                                <p className=''>Patient Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 min-h-125 bg-[url('/hero-image.webp')] bg-center bg-no-repeat bg-cover"></div>
            </div>    
        </section>
    )
}

export default Hero;