import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { SearchAddress } from "features/shared/presentation/components/inputs/search-address";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { ShopStoreListDelivery } from "../components/shop-store-list-delivery";
import { getSession, selectGetSession } from "../../../shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { getStoresAvailableSnackshop } from "../slices/get-stores-available-snackshop.slice";

export function ShopHome(){
    const dispatch = useAppDispatch();
    const [address, setAddress] = useState<any>('');
    const getSessionState = useAppSelector(selectGetSession);
    
    useEffect(()=>{
        dispatch(getSession());
        dispatch(storeReset());
    },[]);

    useEffect(()=>{
        if(getSessionState.data?.customer_address !== null){
            setAddress(getSessionState.data?.customer_address);
        }
    },[]);

    return (
        <section className="container pb-64">
            
            <img className="sm:hidden" src={REACT_APP_UPLOADS_URL + "images/shop/hero/mobile/snackshop_landing_page_banner.webp"} alt="The best pop corn in town"></img>
            <img className="hidden sm:block" src={REACT_APP_UPLOADS_URL + "images/shop/hero/desktop/snackshop_landing_page_banner.webp"} alt="The best pop corn in town"></img>

            <h1 className='text-white text-lg pt-4 pb-2 font-["Bebas_Neue"] tracking-[2px]'>Please search your address for delivery</h1>

            <div className='flex justify-center'>
                <label className="pure-material-textfield-outlined w-[100%] mb-10">
                    <SearchAddress onPlaceSelected={( place : string)=>{
                        setAddress(place);
                        dispatch(getStoresAvailableSnackshop({address: place}));
                    }}/>
                    <span>Search Address</span>
                </label>
            </div>

            <ShopStoreListDelivery address={address}/>
        </section>
    );
}