import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  Column,
  DataTable,
} from "../../../shared/presentation/components/data-table";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";
import { ProfileContainer } from "../components";
import {
  getSnackShopOrderHistory,
  selectGetSnackShopOrderHistory,
} from "features/shop/presentation/slices/get-snackshop-order-history.slice";

const columns: Array<Column> = [
  { id: "date", label: "Date" },
  { id: "trackingNo", label: "Tracking No." },
  { id: "purchaseAmount", label: "Purchase Amount" },
  { id: "raffleCode", label: "Raffle Code" },
  { id: "raffleStatus", label: "Raffle Status" },
];

export function ProfileSnackshopOrders() {
  const getSnackShopOrderHistoryState = useAppSelector(
    selectGetSnackShopOrderHistory
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSnackShopOrderHistory());
  }, [dispatch]);

  return (
    <ProfileContainer title="Snack Shop Orders" activeTab="snackshop">
      <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">
        Snack Shop Orders
      </h1>
      {/* <DataTable
        totalRows={0}
        perPage={0}
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
                value={(
                  parseInt(row.purchase_amount) +
                  parseInt(row.distance_price) +
                  parseInt(row.cod_fee)
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            ),
          },
          {
            rowKey: "generated_raffle_code",
            align: "left",
          },
          {
            rowKey: "application_status",
            align: "left",
          },
        ]}
        viewBaseUrl="/shop/order"
        columns={columns}
        rows={getSnackShopOrderHistoryState.data}
      /> */}
    </ProfileContainer>
  );
}
