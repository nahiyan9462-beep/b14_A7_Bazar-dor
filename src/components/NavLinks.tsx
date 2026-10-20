import { ICategory } from '@/types/categories';
import Link from 'next/link';
import React from 'react';

const NavLinks = async() => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories',{
      next: {
        revalidate:3600
      },


  })
  const data=await res.json()

  const categoryLinks = data 
 
  return (
          <nav
      aria-label="Product categories"
      className="w-full border-b shadow-sm border-gray-200 bg-white"
    >
      <div className="container mx-auto flex items-baseline gap-2 overflow-x-auto px-4 sm:gap-4 sm:px-6 lg:justify-baseline lg:px-8">
        {categoryLinks.map((links:ICategory,index:number) => (
          <Link
            key={links.id}
            href={`/category/${links.slug}`}
            className={`flex gap-2 py-4 text-sm font-medium transition-colors`}
            
          >
            <span aria-hidden="true" className="text-lg">
              {links.icon}
            </span>

            <span>{links.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavLinks;
