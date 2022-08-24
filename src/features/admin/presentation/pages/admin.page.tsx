import React, { useState } from "react";
import {FaBars, FaRegListAlt} from 'react-icons/fa';

// const [open, setOpen] = useState (true);

export function Admin(){
    return(
        <div className='flex'>
            <div className='bg-primary h-screen w-64 relative'>
            <FaBars className='relative cursor-pointer text-white top-4 -right-56'></FaBars>
            </div>
            <div className='bg-red-100 h-screen p-3 flex-1'>
                <h1>Orders</h1>
            </div>

        </div>

        // <section className='bg-red-100 h-screen'>
        //     <h1>Orders</h1>
        // </section>
    );
}