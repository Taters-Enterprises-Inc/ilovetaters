import axios from "axios";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { REACT_APP_DOMAIN_URL, REACT_APP_UPLOADS_URL, TABS } from "features/shared/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';
import { ShopCartModal } from "../modals";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";

export function ShopHeaderNav(){
    const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
    const getSessionState = useAppSelector(selectGetSession);
    const dispatch = useAppDispatch();

    const [openShopCartModal, setOpenShopCartModal] = useState(false); 

    useEffect(()=>{
        dispatch(getSession());
    },[]);

    const handleCart = () =>{
        setOpenShopCartModal(true);
    }

    return (
        <>
            <header className={'sticky w-full top-0 z-20'}>
                <div className={` w-full bg-primary shadow-2xl`}>
                    <nav className={`flex justify-between items-center container mx-auto px-4 py-2`}>
                        <img src={REACT_APP_UPLOADS_URL + "images/shared/logo/taters-snackshop-logo.webp"} alt="Taters Logo" className="w-[100px] lg:w-[160px]"></img>

                        <div  className="justify-center items-center space-x-4 flex">
                            <ul className="text-white font-semibold items-stretch h-[40px] justify-center hidden lg:flex">
                                {
                                    TABS.map((tab: any, i)=>{
                                        return (
                                            <li key={i} className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-extralight ${tab.name === 'SNACKSHOP' ? "text-tertiary" : "text-white"}`}>
                                                <Link to={tab.url}>{tab.name}</Link>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                            <div className="flex justify-center items-center space-x-3 lg:space-x-6">
                                {
                                    getSessionState.data?.userData ? 
                                    <button className="flex justify-center items-center flex-col space-y-1 mt-[-5px]">
                                        <img src={getSessionState.data?.userData.picture} alt='Profile pic' className="rounded-full" width={30}></img>
                                        <span className="text-xs font-extralight text-white">{getSessionState.data?.userData.first_name} {getSessionState.data?.userData.last_name}</span>
                                    </button>
                                    : 
                                        getSessionState.data?.userData === null ? 
                                        <>
                                            <button onClick={()=>setOpenLoginChooserModal(true)} className="space-y-1 flex-col text-white rounded-xl flex justify-center items-center">
                                                <AiOutlineUser className="text-2xl"/> 
                                                <span className="tracking-[2px] text-xs font-extralight">Sign In</span>
                                            </button>
                                        </>
                                    : null
                                }
                                <button onClick={handleCart} className="flex flex-col justifiy-center items-center space-y-1">
                                    <div className="relative space-y-1 flex-col text-white rounded-xl flex justify-center items-center">
                                        <BsCart4 className="text-white text-2xl" />
                                        <span className="absolute rounded-full bg-red-500 h-[1.2rem] w-[1.2rem] lg:h-[1.25rem] lg:w-[1.25rem] -top-2 -right-2 lg:-top-3 lg:-right-2 flex justify-center items-center text-[10px]">0</span>
                                    </div>
                                    <h5 className="text-[13px] font-extralight text-white">₱ 0.00</h5>
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <ShopCartModal open={openShopCartModal} onClose={()=>{
                setOpenShopCartModal(false);
            }}/>
            
            <LoginChooserModal open={openLoginChooserModal} onClose={()=>{
                setOpenLoginChooserModal(false);
            }}/>
        </>
    );
}