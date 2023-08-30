import { useEffect } from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { Button, CircularProgress, TextField, debounce } from "@mui/material";
import { useState } from "react";
import { PayBillingModal } from "../modals";
import {
  selectupdatePayBillingOrders,
  updatePayBillingOrders,
  updatePayBillingOrdersState,
} from "../slices/update-pay-billing.slice";
import { updatePayBillingParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  GetPayBillingSiState,
  getPayBillingSi,
  selectGetPayBillingSi,
} from "../slices/get-pay-billing-si.slice";
import { SnackbarAlert } from "features/shared/presentation/components";
import { InvoiceFilter } from "./invoice-filter";
import { createQueryParams } from "features/config/helpers";
import { useNavigate } from "react-router-dom";

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
  open: boolean;
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
  const [openAlert, setOpenAlert] = useState(false);

  const query = useQuery();
  const invoiceSearch = query.get("invoiceSearch");

  const getPayBillingSiState = useAppSelector(selectGetPayBillingSi);
  const getBillingState = useAppSelector(selectupdatePayBillingOrders);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const buttonStyle = {
    color: "white",
    backgroundColor: "#CC5801",
  };

  const InvoiceData = getPayBillingSiState.data?.orders.map((row) => {
    return {
      id: row.si,
      order_id: row.order_id,
      store_name: row.store,
      order_placement_date: row.order_placement_date,
      requested_delivery_date: row.requested_delivery_date,
      commited_delivery_date: row.commited_delivery_date,
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

  useEffect(() => {
    const query = createQueryParams({
      invoiceSearch: invoiceSearch,
    });
    dispatch(getPayBillingSi(query));
  }, [dispatch, invoiceSearch]);

  useEffect(() => {
    if (updatePayBillingOrdersState.fail === getBillingState.status) {
      setOpenAlert(true);
    } else if (updatePayBillingOrdersState.success === getBillingState.status) {
      setOpenAlert(false);
      props.onClose(true);
    }
  }, [getBillingState.status]);

  useEffect(() => {
    setTimeout(() => setOpenAlert(false), 5000);
  }, [openAlert]);

  const handlePayBilling = async () => {
    const payBilingParam: updatePayBillingParam = {
      selectedData: selectedData ?? [],
      paymentFile: uploadedReceipt,
      remarks: remarks,
    };

    await dispatch(updatePayBillingOrders(payBilingParam));
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

  const debouncedSearch = debounce((val) => {
    const params = {
      invoiceSearch: val === "" ? null : val,
    };
    const queryParams = createQueryParams(params);
    navigate({
      pathname: "",
      search: queryParams,
    });
  }, 500);

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
            components={{
              Toolbar: () => (
                <div className="flex ">
                  <span className="flex items-center px-3">
                    Search Sales Invoice:
                  </span>

                  <InvoiceFilter
                    search={invoiceSearch ?? ""}
                    onSearch={(val) => {
                      debouncedSearch(val);
                    }}
                  />

                  {GetPayBillingSiState.success !==
                  getPayBillingSiState.status ? (
                    <CircularProgress size={25} />
                  ) : null}
                </div>
              ),
            }}
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

      <SnackbarAlert
        open={openAlert}
        severity={"error"}
        message={getBillingState.message}
      />
    </>
  );
}
