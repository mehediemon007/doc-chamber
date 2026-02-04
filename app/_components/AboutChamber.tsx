import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// *** Import Icons
import { Heart, MoveRight, ArrowUpRight } from 'lucide-react';

function AboutChamber() {
    return (
        <section>
            <div className="container">
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-1 space-y-4">
                        <p className='inline-flex gap-1.5 bg-primary-opp rounded-[50px] px-3 py-2'><Heart/> Who we are</p>
                        <h2>Dedicated to Better Health, Every Day.</h2>
                        <p className='text-muted-foreground'>Doc-Chamber Emron is a modern healthcare provider dedicated to delivering compassionate, science-backed medical care for every patient. Our team brings together experienced physicians, advanced diagnostics, and personalized treatment plans to ensure you receive clear answers and confident care at every step.</p>
                        <p className='text-muted-foreground'>We believe health should be simple, accessible, and trustworthy that’s why Emron focuses on transparent communication, evidence-based practices, and a patient-first experience. Whether you need routine checkups or specialized support, we are here to guide your journey with expertise and empathy.</p>
                        <Link href={'/signup'} className='btn btn-default btn-primary'>
                            <span>Get Started</span>
                            <MoveRight />
                        </Link>
                    </div>
                    <div className="col-span-1 bg-[url('/about-us.webp')] bg-center bg-no-repeat bg-cover rounded-4xl p-5">
                    </div>
                    <div className="col-span-1 flex flex-col justify-center bg-[#f6f6f6] border border-gray-300 rounded-4xl p-7.5">
                        <Image src={'/doc-icon.png'} alt='doc' width={100} height={100}/>
                        <div className='space-y-4 mt-10'>
                            <h3>Take Charge of Your Health Today</h3>
                            <p className='text-muted-foreground'>Experience compassionate, expert-led care tailored to your needs. Your wellness journey starts with a single step. Connect with Emron’s specialists and get personalized medical support. Let our care team guide you with clarity, comfort, and confidence.</p>
                            <Link href={'/#appointment'} className='inline-flex items-center gap-1.5 font-semibold hover:text-primary'>
                                <span>Book an Appointment</span>
                                <ArrowUpRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutChamber;