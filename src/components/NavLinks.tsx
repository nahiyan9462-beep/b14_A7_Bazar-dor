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

  const categories = data 
  console.log(categories);
  return (
          <nav
      aria-label="Product categories"
      className="w-full border-b border-gray-200 bg-white"
    >
      <div className="mx-auto flex max-w-7xl items-baseline gap-2 overflow-x-auto px-4 sm:gap-4 sm:px-6 lg:justify-baseline lg:px-8">
        {categories.map((category:ICategory,index:number) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`flex shrink-0 items-baseline gap-2 border-b-2 px-3 py-4 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
              index === 0
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-600 hover:border-green-500 hover:text-green-700"
            }`}
          >
            <span aria-hidden="true" className="text-lg">
              {category.icon}
            </span>

            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavLinks;
