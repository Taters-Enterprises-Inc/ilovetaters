import { useAppDispatch, useAppSelector, useQuery } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { selectGetStoresAvailable } from "features/shared/presentation/slices/get-stores-available-slice";
import { selectSetStoreAndAddress, setStoreAndAddress, SetStoreAndAddressState } from "features/shared/presentation/slices/set-store-and-address.slice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSession, selectGetSession } from "../slices/get-session.slice";

interface StoreListProps {
    address: string,
    onClickStore: (storeId: number) => void;
}

export function StoreList(props: StoreListProps ){
    const getStoresAvailableState  = useAppSelector(selectGetStoresAvailable);



    return(
        <section className='text-white'>
            {getStoresAvailableState.data.map((store_cluster, index)=>(
            <div key={index} className="space-y-3">
                <h1 className="text-sm font-normal">{store_cluster.region_name}</h1>
                <section className="pb-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                    {store_cluster.stores.map((store, index)=>{

                        const distance_in_km = Math.ceil( store.store_distance * 1.609344 + store.store_distance * 1.609344 * 0.5);

                        const store_availability = distance_in_km > 10;

                        return (
                            <button 
                                key={index}
                                onClick={ store_availability && props.address != null ? () => {}  :  ()=>props.onClickStore(store.store_id)  }
                                className={`bg-secondary h-full shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] relative ${store_availability && props.address != null ? 'store-not-available' : ''}`}>
                                {
                                    store_availability && props.address != null ?  <span className="p-1 not-within-reach-text text-center ">Store not within reach</span> : null
                                }
                                <div className="text-sm uppercase py-1">FULL MENU</div> 
                                
                                <div className="absolute flex flex-col items-stretch w-full mt-8 space-y-2">
                                        <div className="flex justify-end">
                                            <span className="bg-secondary px-2 text-sm">
                                                {distance_in_km} KM 
                                            </span>
                                        </div>
                                </div>
                                
                                <img src={'https://ilovetaters.com/staging/v2/shop/assets/img/store_images/250/' + store.store_image} alt="" className="w-full sm::w-[250px] sm::h-[250px] object-fit"/>
                                <div className="p-4 space-y-2">
                                    <h1 className="mb-1 text-sm leading-5 font-bold">{store.store_name}</h1>
                                    <p className="text-xs">{store.store_address}</p>
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