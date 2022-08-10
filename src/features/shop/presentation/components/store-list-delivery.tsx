import { useAppDispatch, useAppSelector, useQuery } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { selectGetStoresAvailable } from "features/shared/presentation/slices/get-stores-available-slice";
import { selectSetStoreAndAddress, setStoreAndAddress } from "features/shared/presentation/slices/set-store-and-address.slice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSession, selectGetSession } from "../../../shared/presentation/slices/get-session.slice";

interface StoreListDeliveryProps {
    address: string,
}

export function StoreListDelivery(props: StoreListDeliveryProps ){
    const getStoresAvailableState  = useAppSelector(selectGetStoresAvailable);
    const setStoreAndAddressState = useAppSelector(selectSetStoreAndAddress);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let { platform } = useParams();
    const query = useQuery();
    const category = query.get('category');


    const storeClicked =(storeId: number)=> {
        dispatch(setStoreAndAddress({
            address: props.address,
            storeId,
        }));

        navigate('products');

        document.body.classList.remove('overflow-hidden');
    }

    return(
        <section className='text-white'>
            {getStoresAvailableState.data.map((store_cluster, index)=>(
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
                                className={`bg-secondary shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] max-w-[44.9%] m-[7px] flex-[0_0_44.9%] sm:max-w-[30%] sm:flex-[0_0_30%] lg:max-w-[23.9%] lg:flex-[0_0_23.9%] lg:mb-4 relative ${store_availability && props.address != null ? 'store-not-available' : ''}`}>
                                {
                                    store_availability && props.address != null ?  <span className="p-1 not-within-reach-text text-center ">Store not within reach</span> : null
                                }
                                <div className="text-[10px] lg:text-base uppercase ">FULL MENU</div> 
                                <img src={REACT_APP_DOMAIN_URL + 'v2/shop/assets/img/store_images/250/' + store.store_image} alt="" className="w-full"/>
                                <div className="px-3 py-2">
                                    <h1 className="mb-1 text-[10px] sm:text-lg">{store.store_name}</h1>
                                    <p className="text-[7px] sm:text-xs">{store.store_address}</p>
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