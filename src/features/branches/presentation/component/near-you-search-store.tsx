import React from "react";
import { useAppSelector } from "features/config/hooks";
import { selectGetStoresAvailableBranches } from "../slices/get-stores-available-branches.slice";
import { NearyouSearchCard } from "./near-you-search-card";

export function NearyouSearchStore() {
  const getStoresAvailableBranchesState = useAppSelector(
    selectGetStoresAvailableBranches
  );

  return (
    <section className="text-white ">
      {getStoresAvailableBranchesState.search ? (
        <>
          {getStoresAvailableBranchesState.search.length > 0 ? (
            <>
              <section className="grid grid-cols-2 gap-4 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {getStoresAvailableBranchesState.search.map((store, index) => {
                  return <NearyouSearchCard store={store} key={index} />;
                })}
              </section>
            </>
          ) : (
            <h1 className="text-base font-bold text-center">
              Sorry, we couldn't find any available stores for your search.
            </h1>
          )}
        </>
      ) : (
        <>
          {getStoresAvailableBranchesState.data.map((store_cluster, index) => (
            <div key={index} className="space-y-3">
              <h1 className="text-sm font-normal">
                {store_cluster.region_name}
              </h1>
              <section className="grid grid-cols-2 gap-4 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {store_cluster.stores.map((store, index) => {
                  return <NearyouSearchCard store={store} key={index} />;
                })}
              </section>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
