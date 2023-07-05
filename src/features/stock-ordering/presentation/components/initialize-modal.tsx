import { useAppDispatch } from "features/config/hooks";
import { useEffect } from "react";
import { getProductData } from "../slices/get-product-data.slice";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";

interface InitializeModalProps {
  setRows: ((rows: TableRow) => void) | undefined;
  id: string;
  open: boolean;
}

export const InitializeModal = (props: InitializeModalProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const productID = { orderId: props.id };

    if (props.open) {
      dispatch(getProductData(productID));
    }

    props.setRows?.({
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
      },
      product_data: [],
    });
  }, [dispatch, props.id, props.open]);

  return null;
};
