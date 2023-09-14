import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";
import {
  InitializeModal,
  InitializeProductData,
  StockOrderingWatingSkeleton,
} from "../components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { updateDeliveryReceiveApproval } from "features/stock-ordering/core/stock-ordering.params";
import {
  selectupdateDeliveryReceiveApprovalOrders,
  updateDeliveryReceiveApprovalOrders,
  updateDeliveryReceiveApprovalOrdersState,
} from "../slices/update-delivery-receive-approval.slice";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";

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

  const [rows, setRows] = useState<StockOrderingInformationModel>(
    productDataInitialState
  );

  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const deliveryRecieveApprovalState = useAppSelector(
    selectupdateDeliveryReceiveApprovalOrders
  );

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 5) {
        result = true;
      }
    });

    return result;
  };

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

    dispatch(
      updateDeliveryReceiveApprovalOrders(updateDeliveryReceiveApprovalParam)
    );

    document.body.classList.remove("overflow-hidden");
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
            {rows.product_data.length !== 0 ? (
              <>
                <StockOrderTable
                  isCommitedTextFieldAvailable={false}
                  isStore={false}
                  activeTab={props.currentTab}
                  setRows={setRows}
                  rowData={rows}
                  isDeliveredQtyAvailable={false}
                  isDispatchedQtyAvailable={false}
                  isUpdateBilling={false}
                />
                {setEnabled() ? (
                  <>
                    <div className="flex flex-col">
                      <span>Remarks: </span>
                      <TextField
                        value={remarks}
                        onChange={(event) => setRemarks(event.target.value)}
                        inputProps={{ maxLength: 512 }}
                        multiline
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleValidate("4")}
                        sx={{
                          color: "white",
                          backgroundColor: "#CC5801",
                        }}
                      >
                        Reject
                      </Button>

                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleValidate("6")}
                        sx={{
                          color: "white",
                          backgroundColor: "#CC5801",
                        }}
                      >
                        Approve
                      </Button>
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <>
                {setEnabled() ? (
                  <StockOrderingWatingSkeleton remarks firstDoubleComponents />
                ) : (
                  <StockOrderingWatingSkeleton />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
