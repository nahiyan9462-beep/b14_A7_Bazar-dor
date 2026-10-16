
'use client'

import React, { useEffect, useState } from 'react';

const DateTime = () => {
      const [date, setDate] = useState("");
    
      useEffect(() => {
        const updateDate = () => {
          setDate(
            new Intl.DateTimeFormat("bn-BD", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date())
          );
        };
    
        updateDate();
        const timer = setInterval(updateDate, 60_000);
    
        return () => clearInterval(timer);
      }, []);
    
    return (
         <div className="flex flex-col gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                বাজার দর
                </span>

                <span className="text-sm font-medium text-gray-500 sm:text-base">
                {date || "সঠিক বাজারমূল্য জানুন"}
                </span>
        </div>
    );
};

export default DateTime;