import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { InitializeModal, InitializeProductData } from "../components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { updateDeliveryReceiveApproval } from "features/stock-ordering/core/stock-ordering.params";
import { updateDeliveryReceiveApprovalOrders } from "../slices/update-delivery-receive-approval.slice";

interface DeliveryReceiveApprovalModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function DeliveryReceiveApprovalModal(
  props: DeliveryReceiveApprovalModalProps
) {
  const [remarks, setRemarks] = useState("");

  const getProductDataState = useAppSelector(selectGetProductData);
  const dispatch = useAppDispatch();

  const [rows, setRows] = useState<TableRow>({
    order_information: {
      store_name: "",
      order_number: "",
      requested_delivery_date: "",
      commited_delivery_date: "",
      order_reviewed_date: "",
      order_confirmation_date: "",
      view_delivery_receipt: "",
      dispatch_date: "",
      order_enroute: "",
      actual_delivery_date: "",
      view_updated_delivery_receipt: "",
      billing_information_ready: false,
      view_payment_details: "",
      payment_confirmation: "",
      transport_route: "",
      remarks: [],
    },
    product_data: [],
  });

  InitializeModal({
    setRows: setRows,
    id: props.id,
    open: props.open,
  });

  InitializeProductData({
    setRows: setRows,
    productData: getProductDataState.data
      ? getProductDataState.data
      : undefined,
  });

  useEffect(() => {
    setRemarks("");
  }, [props.open]);

  const handleValidate = async (status: string) => {
    const updateDeliveryReceiveApprovalParam: updateDeliveryReceiveApproval = {
      id: props.id,
      status: status,
      remarks: remarks,
    };

    await dispatch(
      updateDeliveryReceiveApprovalOrders(updateDeliveryReceiveApprovalParam)
    );

    props.onClose();
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div
        id="place-order-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">
              Delivery Receive Approval
            </span>
            <button
              className="text-2xl text-white"
              onClick={() => {
                document.body.classList.remove("overflow-hidden");
                props.onClose();
              }}
            >
              <IoMdClose />
            </button>
          </div>

          <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
            <StockOrderTable
              isCommitedTextFieldAvailable={false}
              isStore={false}
              activeTab={props.currentTab}
              setRows={setRows}
              rowData={rows}
              isDeliveredQtyAvailable={false}
              isDispatchedQtyAvailable={false}
            />

            <div className="flex flex-col px-5">
              <span>Remarks: </span>
              <TextField
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                inputProps={{ maxLength: 128 }}
                multiline
              />
            </div>

            <div className="flex flex-row space-x-4">
              <div className="basis-1/2">
                <Button
                  onClick={() => handleValidate("4")}
                  fullWidth
                  variant="contained"
                >
                  Reject
                </Button>
              </div>
              <div className="basis-1/2">
                <Button
                  onClick={() => handleValidate("6")}
                  fullWidth
                  variant="contained"
                >
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
