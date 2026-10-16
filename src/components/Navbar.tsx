

// import { Button } from "@heroui/react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import DateTime from "./DateTime";

export default function Navbar() {
  return (
    <nav className="shadow-sm">
        <div className="container mx-auto mt-5 p-4 flex items-center justify-between">
            <Link
            href="/"
            aria-label="বাজার দর - হোম"
            className="inline-flex items-center gap-4"
            >
            
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                width="76"
                height="76"
                fill="none"
                role="img"
                aria-label="বাজার দর shopping cart logo"
                className="shrink-0"
            >
                <defs>
                <linearGradient id="marketGreen" x1="10" y1="8" x2="68" y2="72">
                    <stop offset="0%" stopColor="#16A34A" />
                    <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                </defs>


                <path
                d="M9 14h9l7 35a6 6 0 0 0 6 5h30"
                stroke="url(#marketGreen)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                />

                <path
                d="M22 23h48l-7 24H27"
                stroke="url(#marketGreen)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                />

                <path
                d="M29 31h34M31 38h29"
                stroke="#16A34A"
                strokeWidth="2.5"
                strokeLinecap="round"
                />

                <circle cx="34" cy="63" r="4.5" fill="#047857" />
                <circle cx="59" cy="63" r="4.5" fill="#047857" />

                <path
                d="m43 12 7 7 13-12"
                stroke="#16A34A"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
                <DateTime/>
             
            </Link>
            <div className="flex items-center gap-4 sm:gap-6">
   
                <Link
                    href="/signin"
                    className="whitespace-nowrap text-sm font-semibold text-gray-700 transition-colors duration-200 hover:text-green-700 sm:text-base"
                >
                    সাইন ইন
                </Link>

                
                <Link
                    href="/signup"
                    className="whitespace-nowrap rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-95 sm:px-6 sm:text-base"
                >
                    সাইন আপ
                </Link>
                </div>
            
        </div>
         <NavLinks/>
        
        
    </nav>
    
     

  );
}