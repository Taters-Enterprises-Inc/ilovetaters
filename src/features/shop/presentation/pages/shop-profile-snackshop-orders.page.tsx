import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav } from "features/shared";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopProfileContainer } from "../components/shop-profile-container";
import { ShopProfileTabs } from "../components/shop-profile-tabs";
import { Column, DataTable } from "../../../shared/presentation/components/tables/data-table";
import { ShopHeaderNav } from "../header/shop-header-nav.component";
import { getSnackShopOrderHistory, selectGetSnackShopOrderHistory } from "../slices/get-snackshop-order-history.slice";

const columns: Array<Column> = [
    { id: 'date', label: 'Date' },
    { id: 'trackingNo', label: 'Tracking No.'},
    { id: 'purchaseAmount', label: 'Purchase Amount'},
    { id: 'raffleCode', label: 'Raffle Code'},
    { id: 'raffleStatus', label: 'Raffle Status'},
];


export function ShopProfileSnackshopOrders(){

    const getSnackShopOrderHistoryState = useAppSelector(selectGetSnackShopOrderHistory);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getSnackShopOrderHistory());
    },[]);

    return(
        <ShopProfileContainer title="Snack Shop Orders" activeTab="snackshop">
            <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">Snack Shop Orders</h1>             
            <DataTable 
                rowsOrder={[
                    {
                        rowKey: 'dateadded',
                        align: 'left',
                        isTime: true,
                    },
                    {
                        rowKey: 'tracking_no',
                        align: 'left',
                    },
                    {
                        rowKey: 'purchase_amount',
                        align: 'left',
                    },
                    {
                        rowKey: 'generated_raffle_code',
                        align: 'left',
                    },
                    {
                        rowKey: 'application_status',
                        align: 'left',
                    },
                ]}
                viewBaseUrl='/shop/order'
                columns={columns} 
                rows={getSnackShopOrderHistoryState.data}/>
        </ShopProfileContainer>
    );
}