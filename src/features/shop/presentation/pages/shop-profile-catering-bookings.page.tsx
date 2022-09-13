import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import { ShopProfileContainer } from "../components/shop-profile-container";
import {
  Column,
  DataTable,
} from "../../../shared/presentation/components/data-table";
import {
  getCateringBookingHistory,
  selectGetCateringBookingHistory,
} from "../slices/get-catering-booking-history.slice";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";
import Moment from "react-moment";
import NumberFormat from "react-number-format";

const columns: Array<Column> = [
  { id: "date", label: "Date" },
  { id: "trackingNo", label: "Tracking No." },
  { id: "purchaseAmount", label: "Purchase Amount" },
  { id: "bookingStatus", label: "Booking Status" },
];

export function ShopProfileCateringBookings() {
  const getCateringBookingHistoryState = useAppSelector(
    selectGetCateringBookingHistory
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCateringBookingHistory());
  }, [dispatch]);

  return (
    <ShopProfileContainer title="Catering Bookings" activeTab="catering">
      <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">
        Catering Bookings
      </h1>
      <DataTable
        rowsOrder={[
          {
            rowKey: "dateadded",
            align: "left",
            rowComponent: (row: SnackShopOrderModel) => (
              <Moment format="LLL">{row.dateadded}</Moment>
            ),
          },
          {
            rowKey: "tracking_no",
            align: "left",
          },
          {
            rowKey: "purchase_amount",
            align: "left",
            rowComponent: (row: SnackShopOrderModel) => (
              <NumberFormat
                value={parseInt(row.purchase_amount).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            ),
          },
          {
            rowKey: "status",
            align: "left",
          },
        ]}
        columns={columns}
        rows={getCateringBookingHistoryState.data}
      />
    </ShopProfileContainer>
  );
}
