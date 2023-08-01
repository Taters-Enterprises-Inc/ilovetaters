import * as React from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useAppSelector } from "features/config/hooks";
import { selectGetStockOrderProducts } from "../slices/get-products.slice";
import { selectGetStockOrders } from "../slices/get-stock-orders.slice";
import { keys } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";
import { PayBillingModal } from "../modals";

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
  const [openPayBillingModal, setOpenPayBillingModal] = useState(false);
  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");
  const [remarks, setRemarks] = useState("");

  const getStockOrders = useAppSelector(selectGetStockOrders);

  const handleOnRowSelect = (value: GridSelectionModel) => {
    console.log(value);
  };

  const isValidFile = (file: string | File | undefined): boolean => {
    if (!file) {
      return false;
    }

    if (typeof file === "string") {
      return true;
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidExtension =
      fileExtension && allowedExtensions.includes(fileExtension);

    if (!isValidExtension) {
      return false;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      return false;
    }

    return true;
  };

  return (
    <>
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

        <div className="flex flex-row space-x-4">
          <div className="basis-1/2">
            <Button
              onClick={() => setOpenPayBillingModal(true)}
              fullWidth
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#CC5801",
              }}
            >
              Pay Billing
            </Button>
          </div>
          <div className="basis-1/2">
            <Button
              disabled={
                isValidFile(uploadedReceipt) && uploadedReceipt !== ""
                  ? false
                  : true
              }
              fullWidth
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#CC5801",
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>

      <PayBillingModal
        open={openPayBillingModal}
        onClose={() => setOpenPayBillingModal(false)}
        setUploadedReciept={setUploadedReciept}
        isButtonAvailable={true}
      />
    </>
  );
}
