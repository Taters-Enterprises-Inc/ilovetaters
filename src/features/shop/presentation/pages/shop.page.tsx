import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav } from "features/shared";
import { SearchAddress } from "features/shared/presentation/components/inputs/search-address";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { StoreListDelivery } from "../components/store-list-delivery";
import { getSession, selectGetSession } from "../../../shared/presentation/slices/get-session.slice";
import { getStoresAvailable } from "features/shared/presentation/slices/get-stores-available-slice";
import { ShopHeaderNav } from "../header/shop-header-nav.component";
import { Outlet } from "react-router-dom";

export function Shop(){
    return (
        <main className="bg-primary min-h-screen">
            <ShopHeaderNav/>
            
            <Outlet/>

            <FooterNav/>
        </main>
    );
}