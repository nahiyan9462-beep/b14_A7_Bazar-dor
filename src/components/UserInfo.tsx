

'use client'

import { authClient } from '@/lib/auth-client';
import { Avatar, Spinner } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Logout } from './LogOut';
import { Icon } from '@iconify/react';

const UserInfo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {data: session , isPending} = authClient.useSession();
    const user = session?.user;

    if(isPending){
        return <span>Loading...<Spinner color="current" /></span>
    }
    console.log(session)
    

    return (
        <main>

            {
                user? <div className='flex items-center gap-1 p-5'>
                   <Link href='/profile'>
                    <Avatar>
                    <Avatar.Image alt="user-img" src={user?.image as string} />
                    </Avatar>
                    </Link>
                    <h2>{user?.name}</h2>
                    <button  onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2"
                    >
                    <Icon
                    icon="mdi:chevron-down"
                    width={18}
                    height={18}
                    className={`text-red-700 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    />
                    </button>
                    {isOpen && (
                        <Logout/>
                )}
                    

                </div> : <div className='flex items-center gap-4 sm:gap-6'>
            <Link
                href="/sign-In"
                className="whitespace-nowrap text-sm font-semibold text-gray-700 transition-colors duration-200 hover:text-green-700 sm:text-base"
                >
                সাইন ইন
            </Link>
   
            <Link
                href="/sign-up"
                className="whitespace-nowrap rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-95 sm:px-6 sm:text-base"
            >
                সাইন আপ
            </Link>
            </div>
            }
            
        </main>
        
    );
};

export default UserInfo;