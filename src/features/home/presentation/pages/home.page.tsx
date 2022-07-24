import { Drawer } from "@mui/material";
import { FooterNav, HeaderNav } from "features/shared";
import { useEffect, useRef, useState } from "react";
import { FaRegHandshake, FaUserAlt } from 'react-icons/fa';
import { MdExplore, MdLocationOn, MdOutlineStorefront } from 'react-icons/md';
import { IoMdPeople } from 'react-icons/io';
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

const services_desktop = [
    {
        title: 'SnackShop',
        subtitle: 'Online delivery snacks',
        color: '#1d1115',
        textColor: 'white',
        image: 'uploads/images/home_cards/taters_snackshop.jpeg'
    },
    {
        title: 'Franchising',
        subtitle: 'Investment opportunities',
        color: '#1b1915',
        textColor: 'white',
        image: 'uploads/images/home_cards/taters_franchising.jpeg'
    },
    {
        title: 'PopClub',
        subtitle: 'Best deals in town',
        color: '#22201A',
        textColor: 'white',
        image: 'uploads/images/home_cards/taters_popclub.jpeg',
    },
    {
        title: 'Taters Caters',
        subtitle: 'Celebration Snacks',
        color: '#858173',
        textColor: 'black',
        image: 'uploads/images/home_cards/taters_catering.jpeg'
    },
    {
        title: 'Reseller',
        subtitle: 'Community selling',
        color: '#c7b7ad',
        textColor: 'black',
        image: 'uploads/images/home_cards/taters_reseller.jpeg'
    },
    {
        title: 'Branches',
        subtitle: 'Nationwide Locations',
        color: '#d7cdb7',
        textColor: 'black',
        image: 'uploads/images/home_cards/taters_branches.jpg'
    },
];

const services_mobile = [
    {
        title: 'SnackShop',
        subtitle: 'Online delivery snacks',
        color: '#1d1115',
        textColor: 'white',
        image: 'uploads/images/home_cards/taters_snackshop.jpeg'
    },
    {
        title: 'Taters Caters',
        subtitle: 'Celebration Snacks',
        color: '#858173',
        textColor: 'black',
        image: 'uploads/images/home_cards/taters_catering.jpeg'
    },
    {
        title: 'Franchising',
        subtitle: 'Investment opportunities',
        color: '#1b1915',
        textColor: 'white',
        image: 'uploads/images/home_cards/taters_franchising.jpeg'
    },
    {
        title: 'Reseller',
        subtitle: 'Community selling',
        color: '#c7b7ad',
        textColor: 'black',
        image: 'uploads/images/home_cards/taters_reseller.jpeg'
    },
    {
        title: 'PopClub',
        subtitle: 'Best deals in town',
        color: '#22201A',
        textColor: 'white',
        image: 'uploads/images/home_cards/taters_popclub.jpeg',
    },
    {
        title: 'Branches',
        subtitle: 'Nationwide Locations',
        color: '#d7cdb7',
        textColor: 'black',
        image: 'uploads/images/home_cards/taters_branches.jpg'
    },
];


export function Home(){
    
    const [serviceReached, setServiceReached] = useState(false);
    const servicesRef = useRef<any>(null);
    
    const [openDrawer, setOpenDrawer] = useState(false);

    const listenScrollEvent = (event: any) => {
    if (window.scrollY < 203) {
        return setServiceReached(false);
    } else if (window.scrollY > 200) {
        return setServiceReached(true);
    } 
    }

    useEffect(() => {
        
        window.addEventListener('scroll', listenScrollEvent);

        return () => window.removeEventListener('scroll', listenScrollEvent);
    }, []);


    return (
        <section className="bg-[#a21013]">
            <Drawer
                anchor='left'
                open={openDrawer}
            >
                <ul className="p-4 bg-gray-700 h-full text-white">
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <FaUserAlt></FaUserAlt> <span className="text-base font-bold ">My Account</span>
                        </a>
                    </li>
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-gray-300 text-2xl">
                            <MdLocationOn></MdLocationOn>
                            <span className="text-base font-bold">Branches</span>
                        </a>
                    </li>
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <MdOutlineStorefront></MdOutlineStorefront> <span className="text-base font-bold">Franchising</span>
                        </a>
                    </li>
                    
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <IoMdPeople></IoMdPeople> <span className="text-base font-bold">Reseller Program</span>
                        </a>
                    </li>
                    
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <FaRegHandshake></FaRegHandshake> <span className="text-base font-bold">Partner Deals</span>
                        </a>
                    </li>
                    
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <MdExplore></MdExplore> <span className="text-base font-bold">Explore Menu</span>
                        </a>
                    </li>
                    
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <FaUserAlt></FaUserAlt> <span className="text-base font-bold">Company History</span>
                        </a>
                    </li>
                    
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <FaUserAlt></FaUserAlt> <span className="text-base font-bold">Contact Us</span>
                        </a>
                    </li>
                    
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <FaUserAlt></FaUserAlt> <span className="text-base font-bold">Careers</span>
                        </a>
                    </li>
                    
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <FaUserAlt></FaUserAlt> <span className="text-base font-bold">Terms & Conditions</span>
                        </a>
                    </li>
                    
                    
                    <li>
                        <a href="" className="flex items-center space-x-2 py-2 text-2xl text-gray-300">
                            <FaUserAlt></FaUserAlt> <span className="text-base font-bold">Announcements</span>
                        </a>
                    </li>
                </ul>   
            </Drawer>

            <HeaderNav serviceReached={serviceReached}></HeaderNav>

            <section 
                style={{
                    backgroundImage: `url('${REACT_APP_DOMAIN_URL}uploads/images/mobile/banners/taters_entertainment_snacks.jpg')`,
                    backgroundSize: 'contain',
                    backgroundPositionX: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
                className="sm:hidden flex items-end justify-center relative ">
                    <img src={REACT_APP_DOMAIN_URL + "uploads/images/mobile/banners/taters_entertainment_snacks.jpg"} alt="The best pop corn in town" style={{visibility: 'hidden'}}></img>
            </section>
            
            <section 
                style={{
                    backgroundImage: `url('${REACT_APP_DOMAIN_URL}uploads/images/desktop/banners/taters_entertainment_snacks.jpg')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
                className="hidden sm:flex items-end justify-center relative ">
                    <img src={REACT_APP_DOMAIN_URL + "uploads/images/desktop/banners/taters_entertainment_snacks.jpg"} alt="The best pop corn in town" style={{visibility: 'hidden'}}></img>
            </section>


            <section>

                <section ref={servicesRef} className="hidden lg:flex max-w-[1000px] mx-auto flex-wrap pt-2 pb-[90px] lg:pb-0 px-2 justify-center items-center lg:min-h-screen content-start">

                    {
                        services_desktop.map(function(services_desktop, i){
                            return (
                                <div className="flex-[0_0_50%] max-w-[50%] md:flex-[0_0_30%] md:max-w-[40%] lg:max-w-[30%]  lg:flex-[0_0_30%] h-[250px] sm:h-[300px] p-2 text-white">
                                    <div 
                                        style={{
                                            backgroundImage: `url("${REACT_APP_DOMAIN_URL+services_desktop.image}")`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            position: 'relative',
                                        }}
                                        className="shadow-xl h-full flex items-end bg-gray-400 cursor-pointer rounded-[1rem] lg:rounded-[1rem]">
                                        <div className="w-full px-6 pt-14 pb-3 rounded-b-[1rem] lg:rounded-b-[1rem]" style={{
                                            background: `linear-gradient(transparent 0%, ${services_desktop.color} 45%, ${services_desktop.color} 100%)`,
                                            lineHeight: '14px',
                                            color: services_desktop.textColor,
                                        }}>
                                            <h4 className="text-[16px] sm:text-lg lg:text-2xl font-bold ">{services_desktop.title}</h4>
                                            <p className="text-[9px] sm:text-xs lg:text-xs">{services_desktop.subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </section>

                
                <section ref={servicesRef} className="lg:hidden max-w-[1000px] mx-auto flex flex-wrap pt-2 pb-[90px] lg:pb-0 px-2 lg:justify-start justify-center items-center lg:min-h-screen content-start">

                    {
                        services_mobile.map(function(services_mobile, i){
                            return (
                                <div className="flex-[0_0_50%] max-w-[50%] md:flex-[0_0_30%] md:max-w-[40%] lg:max-w-[30%]  lg:flex-[0_0_30%] h-[250px] sm:h-[300px] p-2 text-white">
                                    <div 
                                        style={{
                                            backgroundImage: `url("${REACT_APP_DOMAIN_URL+services_mobile.image}")`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            position: 'relative',
                                        }}
                                        className="shadow-xl h-full flex items-end bg-gray-400 cursor-pointer rounded-[0.5rem] lg:rounded-[2rem]">
                                        <div className="w-full lg:px-6 px-2 pt-14 pb-3 rounded-b-[0.5rem] lg:rounded-b-[2rem]" style={{
                                            background: `linear-gradient(transparent 0%, ${services_mobile.color} 45%, ${services_mobile.color} 100%)`,
                                            lineHeight: '14px',
                                            color: services_mobile.textColor,
                                        }}>
                                            <h4 className="text-[16px] sm:text-lg lg:text-2xl font-bold ">{services_mobile.title}</h4>
                                            <p className="text-[9px] sm:text-xs lg:text-xs">{services_mobile.subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </section>

            </section>
            
            <FooterNav></FooterNav>
        </section>
    )
}