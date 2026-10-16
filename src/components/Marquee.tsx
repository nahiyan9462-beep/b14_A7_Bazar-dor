import { IProducts } from '@/types/products';
 import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import React from 'react';

const Marquee = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products',
        {
             next: {
        revalidate:3600
        },

})
    const data = await res.json()
    const headlines = data
    console.log(headlines);
    return (
        <div className='shadow-sm mt-5 p-4 bg-slate-50'>
             <MarqueeText direction='right' duration={15}>
                    {headlines.map((marquee: IProducts) => (
                    <span key={marquee.id} className="inline-flex items-center gap-1">
                        <span>{marquee.categoryIcon}</span>
                        <span className="ml-2">{marquee.nameBn}</span>
                        <span className="ml-2">
                        {marquee.today} Taka/KG
                        </span>

                        {marquee.change.dir === "up" ? (
                        <span className="ml-1 text-red-700">
                            ▲ {marquee.change.pct}%
                        </span>
                        ) : (
                        <span className="ml-1 text-green-700">
                            ▼ {marquee.change.pct}%
                        </span>
                        )}

                        <span className="mx-5" />
                    </span>
                    ))} 

             </MarqueeText>
               
             
            
        </div>
    );
};

export default Marquee;