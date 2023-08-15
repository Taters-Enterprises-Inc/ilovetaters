import { useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridSelectionApi,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { PayBillingModal } from "../modals";
import { updatePayBillingOrders } from "../slices/update-pay-billing.slice";
import { updatePayBillingParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  getPayBillingSi,
  selectGetPayBillingSi,
} from "../slices/get-pay-billing-si.slice";

const columns: GridColDef[] = [
  { field: "id", headerName: "Sales Invoice", width: 100 },

  { field: "order_id", headerName: "OrderID", width: 70 },
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

interface PayMultipleOrderProps {
  onClose: (close: boolean) => void;
}

interface selectedData {
  invoice: string | undefined;
  orderId: string | undefined;
}

export function PayMultipleOrder(props: PayMultipleOrderProps) {
  const [openPayBillingModal, setOpenPayBillingModal] = useState(false);
  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");
  const [selectedData, setSelectedData] = useState<Array<selectedData>>([]);
  const [remarks, setRemarks] = useState("");

  const getPayBillingSiState = useAppSelector(selectGetPayBillingSi);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPayBillingSi());
  }, [dispatch]);

  const buttonStyle = {
    color: "white",
    backgroundColor: "#CC5801",
  };

  const InvoiceData = getPayBillingSiState.data?.orders.map((row) => {
    const {
      si,
      order_id,
      store,
      order_placement_date,
      requested_delivery_date,
      commited_delivery_date,
    } = row;
    return {
      id: si,
      order_id: order_id,
      store_name: store,
      order_placement_date: order_placement_date,
      requested_delivery_date: requested_delivery_date,
      commited_delivery_date: commited_delivery_date,
    };
  });

  const isValidFile = (file: string | File | undefined): boolean => {
    if (!file) {
      return false;
    }

    if (typeof file === "string") {
      return true;
    }

    const allowedExtensions = ["xls", "xlsx"];
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

  const handlePayBilling = async () => {
    const payBilingParam: updatePayBillingParam = {
      selectedData: selectedData ?? [],
      paymentFile: uploadedReceipt,
      remarks: remarks,
    };

    await dispatch(updatePayBillingOrders(payBilingParam));

    document.body.classList.remove("overflow-hidden");
    props.onClose(true);
  };

  const handleOnSelectionModelChange = (
    selectedInvoice: GridSelectionModel
  ) => {
    const selectedRowsData = selectedInvoice.map((id) => {
      const filter = InvoiceData?.find((data) => data.id === id);

      return { invoice: filter?.id, orderId: filter?.order_id };
    });

    setSelectedData(selectedRowsData);
  };

  return (
    <>
      <div className="space-y-2">
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={InvoiceData ?? []}
            pageSize={5}
            rowsPerPageOptions={[10]}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={handleOnSelectionModelChange}
          />
        </div>

        <div className="flex flex-col">
          <span>Remarks: </span>
          <TextField
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
            inputProps={{ maxLength: 512 }}
            multiline
          />
        </div>

        <div className="flex flex-row space-x-4">
          <div className="basis-1/2">
            <Button
              onClick={() => setOpenPayBillingModal(true)}
              fullWidth
              variant="contained"
              sx={buttonStyle}
            >
              Pay Billing
            </Button>
          </div>
          <div className="basis-1/2">
            <Button
              fullWidth
              variant="contained"
              onClick={handlePayBilling}
              disabled={
                !(
                  isValidFile(uploadedReceipt) &&
                  uploadedReceipt !== "" &&
                  selectedData?.length !== 0
                )
              }
              sx={buttonStyle}
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
