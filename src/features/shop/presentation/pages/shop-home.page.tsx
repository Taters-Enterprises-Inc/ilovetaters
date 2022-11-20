import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { SearchAddress } from "features/shared/presentation/components/search-address";
import { useEffect, useState } from "react";
import { ShopStoreListDelivery } from "../components/shop-store-list-delivery";
import {
  getSession,
  selectGetSession,
} from "../../../shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { getStoresAvailableSnackshop } from "../slices/get-stores-available-snackshop.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  selectShopHomePage,
  setAddressShopHomePage,
} from "../slices/shop-home-page.slice";
import { ShopHeroCarousel } from "../carousels";

export function ShopHome() {
  const dispatch = useAppDispatch();
  const shopHomePageState = useAppSelector(selectShopHomePage);

  useEffect(() => {
    dispatch(storeReset());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-primary">
      <section className="lg:container">
        <ShopHeroCarousel />
      </section>

      <section className="container pb-64">
        <h1 className='text-white text-sm lg:text-lg pt-4 pb-2 font-["Bebas_Neue"] tracking-[2px]'>
          Please search your address for delivery
        </h1>

        <div className="flex justify-center">
          <label className="pure-material-textfield-outlined w-[100%] mb-4">
            <SearchAddress
              value={shopHomePageState.address ? shopHomePageState.address : ""}
              onChange={(value: string) => {
                dispatch(setAddressShopHomePage({ address: value }));
              }}
              onDenied={() => {
                dispatch(
                  getStoresAvailableSnackshop({
                    address: null,
                    service: "SNACKSHOP",
                  })
                );
              }}
              onPrompt={() => {
                dispatch(
                  getStoresAvailableSnackshop({
                    address: null,
                    service: "SNACKSHOP",
                  })
                );
              }}
              onLocateCurrentAddress={(place: string) => {
                dispatch(setAddressShopHomePage({ address: place }));
                dispatch(
                  getStoresAvailableSnackshop({
                    address: place,
                    service: "SNACKSHOP",
                  })
                );
              }}
              onPlaceSelected={(place: string) => {
                dispatch(setAddressShopHomePage({ address: place }));
                dispatch(
                  getStoresAvailableSnackshop({
                    address: place,
                    service: "SNACKSHOP",
                  })
                );
              }}
            />
            <span>Search Address</span>
          </label>
        </div>
        <ShopStoreListDelivery address={shopHomePageState.address} />
      </section>
    </main>
  );
}
