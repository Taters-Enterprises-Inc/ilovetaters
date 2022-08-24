import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopProfileContainer } from "../components/shop-profile-container";

export function ShopProfile(){
    const getSessionState = useAppSelector(selectGetSession);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getSession());
    },[]);
    
    const location = useLocation();
    
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'auto'});
    }, [location]);

    return(
        <ShopProfileContainer title="My Profile" activeTab="profile">
            <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">Personal Information</h1>

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

        </ShopProfileContainer>
    );
}