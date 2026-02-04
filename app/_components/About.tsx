import React from 'react';
import Image from 'next/image';

// *** Import Icons
import { Plus, Heart } from 'lucide-react';

function About() {
    return (
        <section className='py-32'>
            <div className="container">
                <div className='grid grid-cols-2 gap-12.5'>
                    <div className='col-span-1 min-h-62.5 flex flex-col justify-end bg-[url("/about.webp")] bg-center bg-no-repeat bg-cover rounded-4xl p-5'>
                        <div className='flex items-center w-max bg-white rounded-[50px] p-1.5'>
                            <div className='flex'>
                                <Image src='/p-1.jpg' alt='Momin' width={40} height={40} priority={true} fetchPriority='high' className='border-2 border-white rounded-full'/>
                                <Image src='/p-2.jpg' alt='Sabbir' width={40} height={40} priority={true} fetchPriority='high' className='border-2 border-white rounded-full -ml-5'/>
                                <Image src='/p-3.jpg' alt='Tasnimul' width={40} height={40} priority={true} fetchPriority='high' className='border-2 border-white rounded-full -ml-5'/>
                                <span className='inline-flex justify-center items-center w-10 h-10 bg-primary text-white rounded-full -ml-5'>
                                    <Plus size={24}/>
                                </span>
                            </div>
                            <div className='px-3'>
                                <strong className='text-xl text-primary font-semibold'>15K</strong>
                                <p className='text-sm/[1.1em] italic'>Happy Clients</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 space-y-5">
                        <p className='inline-flex gap-1.5 bg-primary-opp rounded-[50px] px-3 py-2'><Heart/> About Us</p>
                        <h2>Where Compassion Meets Clinical Excellence</h2>
                        <p className='text-muted-foreground'>Doc-Chamber Medical is a patient-centered clinic delivering evidence-based care across primary and specialty services. Our mission is to provide clear guidance and measurable outcomes using advanced diagnostics and personalized care plans.</p>
                        <div className='bg-[#f6f6f6] rounded-[10px] p-5'>
                            <h5>Transform Your Health With Doc-Chamber</h5>
                            <p className='text-muted-foreground'>Get expert-guided solutions designed for real, lasting results.</p>
                        </div>
                        <div className='bg-[#fff8ea] rounded-[10px] p-5'>
                            <h5>Start Your Wellness Journey Today</h5>
                            <p className='text-muted-foreground'>Get expert-guided solutions designed for real, lasting results.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;