import React, { useState } from "react";
import { FaBars, FaRegListAlt, FaCartArrowDown, FaTicketAlt, FaQuestionCircle} from "react-icons/fa";
import { MdProductionQuantityLimits, MdFoodBank } from "react-icons/md";
import { GiCardboardBoxClosed} from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { link } from "fs";

export function Admin(){

    const [open, setOpen] = useState(true);

    const menus = [
        {name:"Orders", link:'/', icon: FaRegListAlt},
        {name:"Catering", link:'/', icon: MdFoodBank},
        {name:"Redeems", link:'/', icon: FaCartArrowDown},
        {name:"Raffle", link:'/', icon: FaTicketAlt},
        {name:"Availability", link:'/', icon: MdProductionQuantityLimits},
        {name:"Products", link:'/', icon: GiCardboardBoxClosed},
        {name:"Reports", link:'/', icon: TbReport},
        {name:"Settings", link:'/', icon: MdOutlineSettings},
        {name:"FAQ's", link:'/', icon: FaQuestionCircle}
        
    ]

    return(
        <div className="flex">
            <div className={'relative min-h-screen w-64 bg-primary px-4'} >
                <div className='relative flex justify-end top-5 text-white'>
                <FaBars className="cursor-pointer" onClick={()=> setOpen(!open)}></FaBars>
                </div>
                
                <div className='flex gap-x-4 items-center'>
                    <img src="../favicon.png" alt="logo" className="rounded-full cursor-pointer border-white duration-500"/>
                    <h1 className={'text-white origin-left font-medium duration-300'}>TEI Shop Admin</h1>
                </div>

                <div className="mt-6 text-white cursor-pointer">
                    <h3>Administrator</h3>
                    <h4 className="text-sm">Admin, Members</h4>
                </div>

                <div className="mt-6 flex flex-col gap-4 relative text-white">
                {
                    menus?.map((menu,i)=>(
                        <Link to = {menu?.link} key={i} className='flex items-center gap-3 p-2 hover:bg-white/30 rounded-md duration-200'>
                        <div>
                            {React.createElement(menu?.icon, {size:20})}
                        </div>
                        <h2>{menu?.name}</h2>
                    </Link>
                    ))

                }

                    
                </div>
                
            </div>

            <div className="h-screen bg-red-100 p-2 flex-1">
            </div>

        </div>

    );
}