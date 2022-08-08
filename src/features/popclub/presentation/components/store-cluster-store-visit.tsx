import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectGetAllAvailableStores } from "../slices/get-all-available-stores.slice";
import { getSession } from "../slices/get-session.slice";
import { selectGetStoresAvailable } from '../slices/get-stores-available-slice';
import { setStoreAndAddress } from "../slices/set-store-and-address.slice";

import { selectSetStoreAndAddress } from "../slices/set-store-and-address.slice";

interface StoreClusterProps {
    onClose : any,
    address: string | null,
}

export function StoreClusterStoreVisit(props: StoreClusterProps ){
    const getAllAvailableStoresState  = useAppSelector(selectGetAllAvailableStores);
    const dispatch = useAppDispatch();
    const setStoreAndAddressState = useAppSelector(selectSetStoreAndAddress);
    const navigate = useNavigate();
    let { platform } = useParams();

    const storeClicked =(storeId: number)=> {
        dispatch(setStoreAndAddress({
            address: props.address,
            storeId,
        }));
        props.onClose();

        if(platform){
            if(platform === 'online-delivery'){
                navigate(`../popclub/store-visit?category=all`);
            } else {
                navigate(`?category=all`);
            }
        }else{
            navigate(`store-visit?category=all`);
        }
        
        document.body.classList.remove('overflow-hidden');
    }
    
    
    useEffect(()=>{
        dispatch(getSession());
    },[setStoreAndAddressState, dispatch]);

    return(
        <section className='text-white '>
            {getAllAvailableStoresState.data.map((store_cluster, index)=>(
            <div key={index}>
                <h1 className="text-sm font-normal pl-2">{store_cluster.region_name}</h1>
                <section className="flex flex-wrap pb-2">
                    {store_cluster.stores.map((store, index)=>{

                        const distance_in_km = Math.ceil( store.store_distance * 1.609344 + store.store_distance * 1.609344 * 0.5);

                        const store_availability = distance_in_km > 10;

                        return (
                            <button 
                                key={index}
                                onClick={ store_availability && props.address != null ? () => {console.log('test');
                                }  :  ()=>storeClicked(store.store_id)  }
                                className={`bg-primaryDark shadow-primaryOrange shadow-md rounded-[10px] max-w-[44.9%] m-[7px] flex-[0_0_44.9%] sm:max-w-[32%] sm:flex-[0_0_32%] lg:max-w-[24%] lg:flex-[0_0_24%] lg:mb-4 relative ${store_availability && props.address != null ? 'store-not-available' : ''}`}>
                                {
                                    store_availability && props.address != null ?  <span className="p-1 not-within-reach-text text-center ">Store not within reach</span> : null
                                }
                                <div className="text-[10px] uppercase ">FULL MENU</div>

                                <div className="absolute flex flex-col items-stretch w-full pt-3 space-y-2">
                                    {
                                        store_availability && props.address != null ?  
                                        <div className="flex justify-end">
                                            <span className="bg-white px-2">
                                                {distance_in_km} KM 
                                            </span>
                                        </div> : null
                                    }
                                </div>
                                <img src={REACT_APP_DOMAIN_URL + 'v2/shop/assets/img/store_images/250/' + store.store_image} alt="" width={250}/>
                                <div className="px-3 py-2">
                                    <h1 className="mb-1 text-[10px] lg:text-base">{store.store_name}</h1>
                                    <p className="text-[7px] lg:text-[11px]">{store.store_address}</p>
                                </div>
                            </button>
                        )
                    }
                    )}
                </section>
            </div>
            ))}
        </section>
    );
}