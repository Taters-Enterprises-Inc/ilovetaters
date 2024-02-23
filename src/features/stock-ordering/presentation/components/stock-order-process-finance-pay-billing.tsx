import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useEffect, useState } from "react";
import {
  GetPayBillingSiState,
  getPayBillingSi,
  selectGetPayBillingSi,
} from "../slices/get-pay-billing-si.slice";
import {
  selectUpdatePayBillingOrders,
  updatePayBillingOrders,
} from "../slices/update-pay-billing.slice";
import { createQueryParams } from "features/config/helpers";
import { useNavigate } from "react-router-dom";
import { updatePayBillingParam } from "features/stock-ordering/core/stock-ordering.params";
import { debounce } from "lodash";
import { CircularProgress, TextField, Button } from "@mui/material";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { PayBillingModal, ExcelPreviewModal, PopupModal } from "../modals";
import { InvoiceFilter } from "./invoice-filter";
import { isValidFile } from "./stock-ordering-utils";

interface StockOrderProcessFinancePayBillingProps {
  onClose: () => void;
  open: boolean;
}

interface selectedData {
  invoice: string | undefined;
  orderId: string | undefined;
}

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

export function StockOrderProcessFinancePayBilling(
  props: StockOrderProcessFinancePayBillingProps
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getPayBillingSiState = useAppSelector(selectGetPayBillingSi);

  const query = useQuery();
  const invoiceSearch = query.get("invoiceSearch");

  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");
  const [selectedData, setSelectedData] = useState<Array<selectedData>>([]);
  const [remarks, setRemarks] = useState("");

  const [openPayBillingModal, setOpenPayBillingModal] = useState(false);
  const [openExcelPreview, setOpenExcelPreview] = useState(false);
  const [openPopupModal, setOpenPopupModal] = useState(false);

  useEffect(() => {
    const query = createQueryParams({
      invoiceSearch: invoiceSearch,
    });
    dispatch(getPayBillingSi(query));
  }, [dispatch, invoiceSearch]);

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

  const handleOnSelectionModelChange = (
    selectedInvoice: GridSelectionModel
  ) => {
    const selectedRowsData = selectedInvoice.map((id) => {
      const filter = InvoiceData?.find((data) => data.id === id);

      return { invoice: filter?.id, orderId: filter?.order_id };
    });

    setSelectedData(selectedRowsData);
  };

  const handlePayBilling = async () => {
    const payBilingParam: updatePayBillingParam = {
      selectedData: selectedData ?? [],
      paymentFile: uploadedReceipt,
      remarks: remarks,
    };

    dispatch(updatePayBillingOrders(payBilingParam));

    document.body.classList.remove("overflow-hidden");
    props.onClose();
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
            autoComplete="off"
            onChange={(event) => setRemarks(event.target.value)}
            inputProps={{ maxLength: 512 }}
            multiline
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex space-x-3">
            <Button
              onClick={() => setOpenPayBillingModal(true)}
              fullWidth
              variant="contained"
              sx={STOCK_ORDERING_BUTTON_STYLE}
            >
              Upload Billing Receipt
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenPopupModal(true)}
              disabled={
                !(
                  isValidFile(uploadedReceipt, false) &&
                  uploadedReceipt !== "" &&
                  selectedData?.length !== 0
                )
              }
              sx={STOCK_ORDERING_BUTTON_STYLE}
            >
              Confirm
            </Button>
          </div>
          {uploadedReceipt && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenExcelPreview(true)}
              sx={STOCK_ORDERING_BUTTON_STYLE}
            >
              Preview Excel File
            </Button>
          )}
        </div>
      </div>

      <PopupModal
        open={openPopupModal}
        title={"Confirmation"}
        message={"Are you sure you want to release the payment receipt??"}
        handleNoButton={() => setOpenPopupModal(false)}
        handleYesButton={handlePayBilling}
      />

      <PayBillingModal
        open={openPayBillingModal}
        onClose={() => setOpenPayBillingModal(false)}
        setUploadedReciept={setUploadedReciept}
        isButtonAvailable={true}
        isExcel
      />

      <ExcelPreviewModal
        open={openExcelPreview}
        onClose={() => setOpenExcelPreview(false)}
        file={uploadedReceipt}
      />
    </>
  );
}
