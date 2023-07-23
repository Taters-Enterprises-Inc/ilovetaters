import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import { TextField, Button, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { updatReviewParam } from "features/stock-ordering/core/stock-ordering.params";
import { updateReviewOrders } from "../slices/update-review-order.slice";
import { InitializeModal, InitializeProductData } from "../components";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";

interface ProcurementReviewOrdersModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function ProcurementReviewOrdersModal(
  props: ProcurementReviewOrdersModalProps
) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const [productDataOld, setProductDataOld] = useState<
    TableRow["product_data"]
  >([]);

  const [remarks, setRemarks] = useState("");

  const [rows, setRows] = useState<TableRow>({
    order_information: {
      store_name: "",
      ship_to_address: "",

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

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (
        user_group.id === 3 ||
        user_group.id === 6 ||
        user_group.id === 9 ||
        isEditEnabled
      ) {
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
    setIsEditEnabled(false);
    setRemarks("");
  }, [props.open]);

  const handleOrderReviewed = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const reviewOrdersProductDataParam: updatReviewParam["product_data"] =
      rows.product_data.map((product) => ({
        id: product.id,
        productId: product.productId,
        commitedQuantity: product.commitedQuantity,
      }));

    const reviewOrdersParamData: updatReviewParam = {
      id: props.id,
      remarks: remarks,
      user_id: getAdminSessionState.data?.admin?.user_id ?? "",
      product_data: reviewOrdersProductDataParam,
    };

    await dispatch(updateReviewOrders(reviewOrdersParamData));

    props.onClose();
  };

  const isQuantityEmpty = () => {
    let empty = false;
    rows.product_data.map((product) => {
      if (product.commitedQuantity === "") empty = true;
    });

    return empty;
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
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm "
      >
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">
              Procurement Review Orders
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

          <form onSubmit={handleOrderReviewed}>
            <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
              {setEnabled() ? (
                <div className="flex justify-end items-stretch">
                  <Switch
                    onChange={(event) => {
                      if (!event.target.checked) {
                        setRows({
                          order_information: rows.order_information,
                          product_data: productDataOld,
                        });
                      }

                      setProductDataOld(rows.product_data);
                      setIsEditEnabled(event.target.checked);
                    }}
                    defaultChecked={false}
                  />
                  <span className="font-medium self-center">Enable edit</span>
                </div>
              ) : null}

              <StockOrderTable
                isCommitedTextFieldAvailable={isEditEnabled}
                isStore={false}
                activeTab={props.currentTab}
                setRows={setRows}
                rowData={rows}
                isDeliveredQtyAvailable={false}
                isDispatchedQtyAvailable={false}
              />

              {setEnabled() || isEditEnabled ? (
                <>
                  <div className="flex flex-col px-5">
                    <span>Remarks: </span>
                    <TextField
                      value={remarks}
                      onChange={(event) => setRemarks(event.target.value)}
                      inputProps={{ maxLength: 512 }}
                      multiline
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      disabled={isQuantityEmpty()}
                      fullWidth
                      type="submit"
                      variant="contained"
                    >
                      Order Reviewed
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
