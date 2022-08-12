import axios from "axios";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { REACT_APP_DOMAIN_URL, REACT_APP_UPLOADS_URL, TABS } from "features/shared/constants";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';

export function ShopHeaderNav(){

    const getSessionState = useAppSelector(selectGetSession);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getSession());
    },[]);

    const loginToFacebook = () => {
        
        axios.get(`${REACT_APP_DOMAIN_URL}api/facebook/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        .then(function (response: any) {
            const facebookURL = response.data.url;
            console.log(response.data);
            
            
            if (response.data.result === false) {
                axios.post(`${REACT_APP_DOMAIN_URL}api/facebook/login_point/`,{
                    fb_login_point: window.location.href
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }).then(()=>{
                    window.location.href = facebookURL;
                });
            }
            
        })
    }
    
    

    return (
        <header className={'sticky w-full top-0 z-20'}>
            <div className={` w-full bg-primary shadow-2xl`}>
                <nav className={`flex justify-between items-center container mx-auto px-3 py-2`}>
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
                                <img src={getSessionState.data?.userData.picture} alt='Profile pic' className="rounded-full"></img> : 
                                    getSessionState.data?.userData === null ? 
                                    <>
                                        <button onClick={loginToFacebook} className="space-y-1 flex-col text-white mb-1 rounded-xl flex justify-center items-center">
                                            <AiOutlineUser className="text-2xl"/> 
                                            <span className="tracking-[2px] text-xs font-extralight">Sign In</span>
                                        </button>
                                    </>
                                : null
                            }
                            <div>
                                <button onClick={loginToFacebook} className="relative space-y-1 flex-col text-white mb-1 rounded-xl flex justify-center items-center">
                                    <BsCart4 className="text-white text-2xl" />
                                    <span className="tracking-[2px] text-xs font-extralight">Cart</span>
                                    <span className="absolute rounded-full bg-red-500 h-5 w-5 -top-2 -right-2 flex justify-center items-center text-xs">0</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}