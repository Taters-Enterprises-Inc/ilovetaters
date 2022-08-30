
import React, { useState } from "react";
import { FaBars, FaRegListAlt, FaCartArrowDown, FaTicketAlt, FaQuestionCircle} from "react-icons/fa";
import { MdProductionQuantityLimits, MdFoodBank } from "react-icons/md";
import { GiCardboardBoxClosed} from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { MdOutlineSettings, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";
import { link } from "fs";

export function Admin(){

    const [open, setOpen] = useState(true);

    const menus = [
        {
            name:"Orders", 
            link:'/', 
            icon: FaRegListAlt,
        },
        {
            name:"Catering", 
            link:'/', 
            icon: MdFoodBank
        },
        {
            name:"Popclub", 
            link:'/', 
            icon: FaCartArrowDown
        },
        {
            name:"Raffles", 
            link:'/', 
            icon: FaTicketAlt,
            iconClosed: MdOutlineKeyboardArrowDown,
            iconOpen: MdOutlineKeyboardArrowUp,
            subNav: [
                {
                    name:"Raffles", 
                    link:'/', 
                    icon: FaTicketAlt,
                }
            ]
        },
        {
            name:"Availability", 
            link:'/', 
            icon: MdProductionQuantityLimits,
            iconClosed: MdOutlineKeyboardArrowDown,
            iconOpen: MdOutlineKeyboardArrowUp
        },
        {
            name:"Products", 
            link:'/', 
            icon: GiCardboardBoxClosed
        },
        {
            name:"Reports", 
            link:'/', 
            icon: TbReport
        },
        {
            name:"Settings", 
            link:'/', 
            icon: MdOutlineSettings,
            iconClosed: MdOutlineKeyboardArrowDown,
            iconOpen: MdOutlineKeyboardArrowUp
        },
        {
            name:"FAQ's", 
            link:'/', 
            icon: FaQuestionCircle
        }
        
    ]

    return(
        <div className="flex">
            <div className={`${open ? 'w-64':'w-20'} relative min-h-screen bg-primary px-4 font-["Roboto"] duration-500`}>
                <div className='relative flex justify-end top-5 text-white'>
                <FaBars className="cursor-pointer" onClick={()=> setOpen(!open)}></FaBars>
                </div>
                
                <div className='flex gap-x-4 items-center'>
                    <img src={require('assets/favicon.png')} className="rounded-full cursor-pointer border-white duration-500"/>
                    <h1 className={`whitespace-pre duration-300 text-white origin-left font-medium 
                    ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>TEI Shop Admin</h1>
                </div>

                <div className={`whitespace-pre duration-300 mt-6 text-white 
                ${!open && 'opacity-0 translate-x-28 overflow-hidden '}`}>
                    <h3 className="cursor-pointer">Administrator</h3>
                    <h4 className="text-12 cursor-pointer">Admin, Members</h4>
                </div>

                <div className="mt-6 flex flex-col relative text-white text-sm">
                {
                    menus?.map((menu,i)=>(
                        <Link to = {menu?.link} key={i} className='flex items-center gap-3 p-2
                         hover:bg-white/30 rounded-md duration-200'>
                        <div className="ml-1.5">
                            {React.createElement(menu?.icon, {size:20})}
                        </div>
                        <h2 className={`whitespace-pre duration-300 
                        ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}</h2>
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

