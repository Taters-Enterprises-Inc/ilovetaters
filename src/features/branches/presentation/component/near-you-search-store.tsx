import React from "react";
import { useAppSelector } from "features/config/hooks";
import { selectGetStoresAvailableBranches } from "../slices/get-stores-available-branches.slice";
import { NearyouSearchCard } from "./near-you-search-card";


export interface StoreType {
  store_name: string;
  store_distance: number;
  store_image: string;
  contactno: string;
  operatinghours: string;
  address: string;
}

export function NearyouSearchStore() {
  const getStoresAvailableBranchesState = useAppSelector(
    selectGetStoresAvailableBranches
  );

 

  return (
    <section className="text-white ">
      {getStoresAvailableBranchesState.data.map(
        (store_cluster: any, index: number) => (
          <div key={index} className="space-y-3">
            <h1 className="text-sm font-normal">{store_cluster.region_name}</h1>
            <section className="grid grid-cols-2 gap-4 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {store_cluster.stores.map((store: StoreType, index: number) => {
                return <NearyouSearchCard store={store} key={index}/>
              })}
            </section>
          </div>
        )
      )}
    </section>
  );
}
