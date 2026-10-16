import Banner from '@/components/Banner';
import Marquee from '@/components/Marquee';
import Navbar from '@/components/Navbar';
import React from 'react';

const HomePage = () => {
  return (
     <div>
         <Navbar/>
        <Marquee/>
        <Banner/>
     </div>
     
  );
};

export default HomePage;