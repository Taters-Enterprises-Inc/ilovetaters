import React from "react";
import { SearchAddress } from "features/shared/presentation/components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  selectBranchesNearYouComponent,
  setAddressBranchesNearYouComponent,
} from "../slices/branches-near-you-component.slice";
import { getStoresAvailableBranches } from "../slices/get-stores-available-branches.slice";
import { NearyouSearchStore } from "./near-you-search-store";
export const BranchComponent: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const branchesNearYouComponentSlice = useAppSelector(
    selectBranchesNearYouComponent
  );

  return (
    <section className="bg-primary ">
      <section className="block antialiased font-['Bebas_Neue']">
        <h1 className=" md:text-[3rem] text-[2rem] font-normal text-center container py-4 text-[#f2f1ed] tracking-[2px]">
          Our Branches
        </h1>
      </section>

      <section className="container pb-[200px]">
        <div className="flex items-center justify-center mb-3">
          <label className="w-full pure-material-textfield-outlined">
            <SearchAddress
              value={
                branchesNearYouComponentSlice.address
                  ? branchesNearYouComponentSlice.address
                  : ""
              }
              onLocateCurrentAddress={(place: string) => {
                dispatch(
                  getStoresAvailableBranches({
                    address: place,
                    service: "SNACKSHOP",
                  })
                );
              }}
              onChange={(value: string) => {
                dispatch(
                  setAddressBranchesNearYouComponent({ address: value })
                );
              }}
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
    </section>
  );
};
