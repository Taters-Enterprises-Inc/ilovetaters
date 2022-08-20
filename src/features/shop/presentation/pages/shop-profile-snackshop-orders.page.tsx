import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav } from "features/shared";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopProfileContainer } from "../components/shop-profile-container";
import { ShopProfileTabs } from "../components/shop-profile-tabs";
import { SnackShopOrdersTable } from "../components/snackshop-orders-table";
import { ShopHeaderNav } from "../header/shop-header-nav.component";

export function ShopProfileSnackshopOrders(){

    return(
        <ShopProfileContainer title="Snack Shop Orders" activeTab="snackshop">
            <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6 mb-10">Snack Shop Orders</h1>             
            <SnackShopOrdersTable/>
        </ShopProfileContainer>
    );
}