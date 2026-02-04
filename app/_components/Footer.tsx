import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

// *** Import Icons
import { Facebook, Youtube, Instagram, PhoneCall, Mail, MapPin } from 'lucide-react';

function Footer() {
    return (
        <footer className="relative bg-[url('/footer-bg.webp')] bg-top-left bg-no-repeat bg-cover py-16 overlay before:bg-[#0a0c0f] before:opacity-90!">
            <div className="container">
                <div className="flex justify-between gap-30">
                    <div className="col-span-1">
                        <Link href='/'>
                            <Image src={'/chamber-logo.png'} alt='doc-chamber' width={178} height={74} priority={true} fetchPriority='high'/>
                        </Link>
                        <p className='max-w-[320px] text-white my-4'>Doc-Chamber provides trusted, patient focused healthcare with expert doctors and advanced medical services. A modern healthcare center committed to accuracy, comfort, and patient well being.</p>
                        <div className='flex items-center gap-4'>
                            <a href="https://www.facebook.com/" target='_blank' aria-label='facebook' className='inline-flex justify-center items-center w-10 h-10 bg-white rounded-full'><Facebook /></a>
                            <a href="https://www.youtube.com/" target='_blank' aria-label='youtube' className='inline-flex justify-center items-center w-10 h-10 bg-white rounded-full'><Youtube /></a>
                            <a href="https://www.instagram.com/?hl=en" target='_blank' aria-label='instagram' className='inline-flex justify-center items-center w-10 h-10 bg-white rounded-full'><Instagram /></a>
                        </div>
                    </div>
                    <div className='flex justify-between gap-8'>
                        <div className='flex-1'>
                            <h5 className='text-white border-b border-white pb-4'>Opening Hours</h5>
                            <div className='mt-6 space-y-2'>
                                <p className='text-white'><span className='text-primary'>Monday – Friday:</span> 8:00 AM – 8:00 PM</p>
                                <p className='text-white'><span className='text-primary'>Saturday:</span> 9:00 AM – 5:00 PM</p>
                                <p className='text-white'><span className='text-primary'>Sunday:</span> Closed (Emergency Open 24/7)</p>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <h5 className='text-white border-b border-white pb-4'>Inquiry</h5>
                            <div className='mt-6 space-y-2'>
                                <p className='flex items-center gap-3 text-white'><PhoneCall className='text-primary shrink-0'/> <a href="tel:+7042791249">+(704) 279-1249</a></p>
                                <p className='flex items-center gap-3 text-white'><Mail className='text-primary shrink-0'/> <a href='mailto:info@example.com'>info@example.com</a></p>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <h5 className='text-white border-b border-white pb-4'>Location</h5>
                            <p className='flex gap-2 text-white mt-6'><MapPin className='text-primary shrink-0'/> <span>17504 Carlton Cuevas Rd, Gulfport, MS, 39503</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;