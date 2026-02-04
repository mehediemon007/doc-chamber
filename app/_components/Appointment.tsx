import React from 'react';
import BookingForm from './BookingForm';

// *** Import Icons
import { CalendarPlus2, PhoneMissed, CalendarDays } from 'lucide-react';

const Appointment = () => {
    return (
        <section className='py-32' id='appointment'>
            <div className="container">
                <div className="grid grid-cols-2 gap-12.5">
                    <div className="col-span-1 bg-accent rounded-4xl p-7.5 space-y-8">
                        <div className='space-y-5'>
                            <span className='inline-flex justify-center items-center w-16 h-16 text-white bg-primary rounded-lg'>
                                <CalendarDays />
                            </span>
                            <h4>Schedule Appointment</h4>
                            <div className='border-t border-t-gray-300 pt-6'>
                                <p className='text-lg text-muted-foreground'><span className='text-primary'>Monday – Friday:</span> 8:00 AM – 8:00 PM</p>
                                <p className='text-lg text-muted-foreground'><span className='text-primary'>Saturday:</span> 9:00 AM – 5:00 PM</p>
                                <p className='text-lg text-muted-foreground'><span className='text-primary'>Sunday:</span> Closed (Emergency Open 24/7)</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <span className='inline-flex justify-center items-center w-16 h-16 text-white bg-primary rounded-full'><PhoneMissed /></span>
                            <div>
                                <p className='text-lg text-muted-foreground'>Call Center</p>
                                <a href="tel:1800555500" className='text-2xl font-bold font-manrope'>1-800-555-500</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 space-y-5">
                        <p className='inline-flex gap-1.5 bg-primary-opp rounded-[50px] px-3 py-2'><CalendarPlus2 /> Appointment</p>
                        <h2 className='max-w-115 leading-14'>Make an Appointment Now!</h2>
                        <p className='max-w-95 text-muted-foreground'>From satisfied customers to loyal supporters, our community voices share.</p>
                        <BookingForm/>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Appointment;