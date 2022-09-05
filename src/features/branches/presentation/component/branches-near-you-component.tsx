import { SearchAddress } from "features/shared/presentation/components/search-address";
import React from "react";
import { useAppDispatch } from "features/config/hooks";
import { NearyouSearchStore } from "./near-you-search-store";
import { getStoresAvailableBranches } from "../slices/get-stores-available-branches.slice";

export const BranchesNearyouComponent: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <section className="container pb-[200px] px-4">
      <h1 className="uppercase text-[1.3rem] text-[#fff] font-['Bebas_Neue'] tracking-[2px]">
        WHICH STORE IS NEAR YOU?
      </h1>
      <div className="flex items-center justify-center mb-3">
        <label className="w-full pure-material-textfield-outlined">
          <SearchAddress
            onPlaceSelected={(place: string) => {
              dispatch(
                getStoresAvailableBranches({
                  address: place,
                  service: "SNACKSHOP",
                })
              );
            }}
          />
          <span>Search Address</span>
        </label>
      </div>

      <NearyouSearchStore />
    </section>
  );
};
