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
import { getCateringBookingHistory, selectGetCateringBookingHistory } from "../slices/get-catering-booking-history.slice";

const columns: Array<Column> = [
    { id: 'date', label: 'Date' },
    { id: 'trackingNo', label: 'Tracking No.'},
    { id: 'purchaseAmount', label: 'Purchase Amount'},
    { id: 'bookingStatus', label: 'Booking Status'},
];


export function ShopProfileCateringBookings(){
    
    const getCateringBookingHistoryState = useAppSelector(selectGetCateringBookingHistory);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getCateringBookingHistory());
    },[]);

    return(
        <ShopProfileContainer title="Catering Bookings" activeTab="catering">
            <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">Catering Bookings</h1> 
            <DataTable 
                rowsOrder={[
                    {
                        rowKey: 'dateadded',
                        align: 'left',
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
                        rowKey: 'status',
                        align: 'left',
                    },
                ]}
                columns={columns} 
                rows={getCateringBookingHistoryState.data}/>
        </ShopProfileContainer>
    );
}