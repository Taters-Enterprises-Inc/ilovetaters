import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { REACT_APP_UPLOADS_URL, TABS } from "features/shared/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";

interface HeaderNavProps {
    serviceReached: boolean,
    active: string,
    sticky?: boolean,
}


export function HeaderNav(props: HeaderNavProps){

    const getSessionState = useAppSelector(selectGetSession);
    const dispatch = useAppDispatch();
    const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);

    useEffect(()=>{
        dispatch(getSession());
    },[]);

    return (
        <>
            <header className={`${props.sticky? 'sticky' : 'fixed'} w-full top-0 z-20 `}>
                <div className={` w-full ${props.serviceReached ? 'bg-primary shadow-2xl':''}`}>
                    <nav className={`lg:flex hidden justify-between items-center container py-2`}>
                        <img src={REACT_APP_UPLOADS_URL + "images/shared/logo/taters-logo.webp"} alt="Taters Logo" className="w-[150px] lg:w-[160px]"></img>

                        <div  className="justify-center items-center space-x-4 flex">
                            <ul className="flex text-white font-semibold items-stretch h-[40px] justify-center ">
                                {
                                    TABS.map((tab: any, i)=>{
                                        return (
                                            <li key={i} className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-extralight ${props.active === tab.name ? "text-tertiary" : "text-white"}`}>
                                                <Link to={tab.url}>{tab.name}</Link>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                            {
                                
                            }
                            {
                                getSessionState.data?.userData ? 
                                <img src={getSessionState.data?.userData.picture} alt='Profile pic' className="rounded-full"></img> : 
                                    getSessionState.data?.userData === null ? 
                                    <button onClick={()=>setOpenLoginChooserModal(true)}className="bg-red-600 text-white mb-1 h-[40px] px-4 rounded-full uppercase tracking-lg flex justify-center items-center font-['Bebas_Neue'] text-lg tracking-[2px] font-extralight">SIGN IN</button>
                                : null
                            }
                        </div>
                    </nav>
                </div>
            </header>
            
            <LoginChooserModal open={openLoginChooserModal} onClose={()=>{
                setOpenLoginChooserModal(false);
            }}/>
        </>
    );
}