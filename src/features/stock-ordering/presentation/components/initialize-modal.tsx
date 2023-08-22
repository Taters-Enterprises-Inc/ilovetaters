import { useAppDispatch } from "features/config/hooks";
import { useEffect } from "react";
import { getProductData } from "../slices/get-product-data.slice";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";

interface InitializeModalProps {
  setRows: ((rows: StockOrderingInformationModel) => void) | undefined;
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
        store_id: "",
        ship_to_address: "",
        order_number: "",
        requested_delivery_date: "",
        commited_delivery_date: "",
        order_reviewed_date: "",
        view_delivery_receipt: "",
        dispatch_date: "",
        actual_delivery_date: "",
        view_updated_delivery_receipt: "",
        view_payment_details: "",
        payment_confirmation: "",
        transport_route: "",
        region_id: 0,
        remarks: [],
        updated_delivery_goods_receipt: "",
        updated_delivery_region_receipt: "",
      },
      product_data: [],
    });
  }, [dispatch, props.id, props.open]);

  return null;
};
