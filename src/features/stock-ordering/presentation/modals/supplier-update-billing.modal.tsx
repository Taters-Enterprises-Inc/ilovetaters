import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AddBillingInformationModal } from "./add-billing-information.modal";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { InitializeModal, InitializeProductData } from "../components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { updateBillingOrderParam } from "features/stock-ordering/core/stock-ordering.params";
import { updateBillingOrders } from "../slices/update-billing-order.slice";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";

interface SupplierUpdateBillingModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierUpdateBillingModal(
  props: SupplierUpdateBillingModalProps
) {
  const [openAddBillingInformationModal, setOpenAddBillingInformationModal] =
    useState(false);

  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [billingInformation, setBillingInformation] = useState<{
    billing_id: string;
    billing_amount: string;
  }>({
    billing_id: "",
    billing_amount: "",
  });

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

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 4 || user_group.id === 6) {
        result = true;
      }
    });

    return result;
  };

  useEffect(() => {
    setBillingInformation({
      billing_id: "",
      billing_amount: "",
    });
  }, [props.open]);

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

  const handleSupplierUpdate = async () => {
    const billingOrdersParamData: updateBillingOrderParam = {
      id: props.id,
      billingInformationId: billingInformation.billing_id,
      billingAmount: billingInformation.billing_amount,
    };

    await dispatch(updateBillingOrders(billingOrdersParamData));
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
            <span className="text-2xl text-white">Update Order Billing</span>
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
            {setEnabled() ? (
              <div className="flex flex-row space-x-4">
                {/* <div className="basis-1/2">
                  <Button
                    onClick={() => {
                      setOpenAddBillingInformationModal(true);
                    }}
                    fullWidth
                    variant="contained"
                  >
                    Add Billing Information
                  </Button>
                </div> */}
                <div className="basis-full">
                  <Button
                    // disabled={
                    //   billingInformation.billing_amount === "" &&
                    //   billingInformation.billing_id === ""
                    //     ? true
                    //     : false
                    // }
                    onClick={() => handleSupplierUpdate()}
                    fullWidth
                    variant="contained"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* 
      <AddBillingInformationModal
        open={openAddBillingInformationModal}
        onClose={() => setOpenAddBillingInformationModal(false)}
        setBillingInformation={setBillingInformation}
      /> */}
    </>
  );
}
