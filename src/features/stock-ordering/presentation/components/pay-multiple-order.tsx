import * as React from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useAppSelector } from "features/config/hooks";
import { selectGetStockOrderProducts } from "../slices/get-products.slice";
import { selectGetStockOrders } from "../slices/get-stock-orders.slice";
import { keys } from "@mui/system";

const columns: GridColDef[] = [
  { field: "id", headerName: "OrderID", width: 70 },
  { field: "store_name", headerName: "Store name", width: 200 },
  {
    field: "order_placement_date",
    headerName: "Order Placement",
    width: 160,
  },
  {
    field: "requested_delivery_date",
    headerName: "Request Delivery",
    width: 160,
  },
  {
    field: "commited_delivery_date",
    headerName: "Commited Delivery",
    width: 160,
  },
];

export function PayMultipleOrder() {
  const getStockOrders = useAppSelector(selectGetStockOrders);

  const handleOnRowSelect = (value: GridSelectionModel) => {
    console.log(value);
  };

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={
            getStockOrders.data?.orders.map((row) => {
              return {
                id: row.id,
                store_name: row.store_name,
                order_placement_date: row.order_placement_date,
                requested_delivery_date: row.requested_delivery_date,
                commited_delivery_date: row.commited_delivery_date,
              };
            }) ?? []
          }
          pageSize={5}
          rowsPerPageOptions={[10]}
          columns={columns}
          checkboxSelection
          onSelectionModelChange={handleOnRowSelect}
        />
      </div>
    </div>
  );
}
