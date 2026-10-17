import Banner from '@/components/Banner';
import Marquee from '@/components/Marquee';
import Products from '@/components/Products';
import React from 'react';

const HomePage = () => {
  return (
     <div>
          
        <Marquee/>
        <Banner/>
        <Products/>
     </div>
     
  );
};

export default HomePage;