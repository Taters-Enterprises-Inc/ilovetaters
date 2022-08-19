import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav } from "features/shared";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopProfileTabs } from "../components/shop-profile-tabs";
import { ShopHeaderNav } from "../header/shop-header-nav.component";

export function ShopProfile(){

    const getSessionState = useAppSelector(selectGetSession);
    const dispatch = useAppDispatch();
    const location = useLocation();


    useEffect(()=>{
        dispatch(getSession());
    },[]);
    
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [location]);

    return(
        <main className="bg-primary">
            <ShopHeaderNav/>

            <div className="bg-secondary lg:h-[240px] text-white">
            </div>
            
            <section className="min-h-screen lg:space-x-4 pb-36">
                <div className="lg:-mt-[200px] lg:space-y-8">

                    <div className="py-6 lg:py-0 flex flex-col lg:flex-row justify-between items-center bg-secondary lg:container space-y-2 lg:space-y-0">
                        <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">My Profile</h1>
                        
                        <nav className="flex" aria-label="Breadcrumb">

                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link to='/shop' className="inline-flex items-center text-xs lg:text-base font-medium text-gray-400">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Snackshop
                                    </Link>
                                </li>
                                <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <Link to='/shop' className="ml-1 text-xs lg:text-base font-medium text-gray-400 md:ml-2">Stores</Link>
                                </div>
                                </li>
                                <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span className="ml-1 text-xs lg:text-base font-medium text-white md:ml-2 ">Profile</span>
                                </div>
                                </li>
                            </ol>

                        </nav>
                        
                    </div>

                    <div className="container">
                        
                        <ShopProfileTabs active="profile"/>

                        <div className="bg-primary profile-tab-content py-6 lg:shadow-[0_3px_10px_rgba(0,0,0,0.5)] w-full mb-10 p-6 space-y-6">
                            <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6 mb-10">Personal Information</h1>
                            <div className="flex space-x-4">
                                {
                                    getSessionState.data?.userData.first_name? 
                                    <TextField
                                      required
                                      label="First Name"
                                      defaultValue={getSessionState.data?.userData.first_name}
                                      className='flex-1'
                                      name='firstName'
                                    />
                                    : null
                                }
                                <TextField required label="First Name" variant="outlined" className={`flex-1 ${getSessionState.data?.userData.first_name ? '!hidden' : ''}`} name='firstName'/>

                                {
                                    getSessionState.data?.userData.last_name? 
                                    <TextField
                                      required
                                      label="Last Name"
                                      defaultValue={getSessionState.data?.userData.last_name}
                                      className='flex-1'
                                      name='lastName'
                                    />
                                    : null
                                }
                                <TextField required label="Last Name" variant="outlined" className={`flex-1 ${getSessionState.data?.userData.last_name ? '!hidden' : ''}`} name='lastName'/>

                            </div>

                            {
                                getSessionState.data?.userData.email? 
                                <TextField
                                    required
                                    label="E-mail"
                                    defaultValue={getSessionState.data?.userData.email}
                                    className='flex-1'
                                    name='eMail'
                                />
                                : null
                            }

                            <TextField required label="E-mail" variant="outlined" className={`w-full ${getSessionState.data?.userData.email ? '!hidden' : ''}`} name='eMail'/>

                        </div>

                    </div>

                </div>
                    
            </section>
            
            <FooterNav/>

        </main>
    );
}