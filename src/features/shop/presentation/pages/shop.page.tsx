import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav } from "features/shared";
import { SearchAddress } from "features/shared/presentation/components/inputs/search-address";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { StoreListDelivery } from "../components/store-list-delivery";
import { getSession, selectGetSession } from "../../../shared/presentation/slices/get-session.slice";
import { getStoresAvailable } from "features/shared/presentation/slices/get-stores-available-slice";
import { ShopHeaderNav } from "../header/shop-header-nav.component";

export function Shop(){
    const dispatch = useAppDispatch();
    const [address, setAddress] = useState<any>('');
    const getSessionState = useAppSelector(selectGetSession);
    
    useEffect(()=>{
        dispatch(getSession());
    },[]);

    useEffect(()=>{
        if(getSessionState.data?.customer_address !== null){
            setAddress(getSessionState.data?.customer_address);
        }
    },[]);

    return (
        <main className="bg-primary">
            <ShopHeaderNav/>
            

            <section className="container  min-h-screen pb-64">
                
                <img className="sm:hidden" src={REACT_APP_UPLOADS_URL + "images/shop/hero/mobile/snackshop_landing_page_banner.webp"} alt="The best pop corn in town"></img>
                <img className="hidden sm:block" src={REACT_APP_UPLOADS_URL + "images/shop/hero/desktop/snackshop_landing_page_banner.webp"} alt="The best pop corn in town"></img>

                <h1 className='text-white text-lg pt-4 pb-2 font-["Bebas_Neue"] tracking-[2px]'>Which store are you visiting?</h1>

                <div className='flex justify-center'>
                    <label className="pure-material-textfield-outlined w-[100%] mb-10">
                        <SearchAddress onPlaceSelected={( place : string)=>{
                            setAddress(place);
                            dispatch(getStoresAvailable({address: place}));
                        }}/>
                        <span>Search Address</span>
                    </label>
                </div>

                <StoreListDelivery address={address}/>

            </section>

            <FooterNav/>
        </main>
    );
}