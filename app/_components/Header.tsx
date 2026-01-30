import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// *** Import Icons
import { UserRoundPlus, RectangleEllipsis } from 'lucide-react';

function Header() {
    return (
        <header>
            <div className="container">
                <div className="flex justify-between items-center gap-4 py-2">
                    <Link href='/'>
                        <Image src={'/chamber-logo.png'} alt='doc-chamber' width={178} height={74} priority={true} fetchPriority='high'/>
                    </Link>
                    <div className='flex items-center gap-3'>
                        <Link href={'/login'} className='btn btn-small btn-primary'>
                            <RectangleEllipsis size={16}/>
                            <span>Login</span>
                        </Link>
                        <Link href={'/signup'} className='btn btn-small btn-default'>
                            <UserRoundPlus size={16}/>
                            <span>Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;