import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav } from "features/shared";
import { SearchAddress } from "features/shared/presentation/components/inputs/search-address";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { StoreListDelivery } from "../components/store-list-delivery";
import { getSession, selectGetSession } from "../../../shared/presentation/slices/get-session.slice";
import { getStoresAvailable } from "features/shared/presentation/slices/get-stores-available-slice";
import { HeaderNav } from "../../../shared/presentation/components/header/header-nav";
import { Outlet } from "react-router-dom";

export function Shop(){
    return (
        <main className="bg-primary min-h-screen">
            <HeaderNav 
                activeUrl="SNACKSHOP" 
                logoProps={{
                    src: REACT_APP_UPLOADS_URL + "images/shared/logo/taters-snackshop-logo.webp",
                    alt: "Taters Logo",
                    className: "w-[100px] lg:w-[160px]"
                }}/>
            
            <Outlet/>

            <FooterNav/>
        </main>
    );
}