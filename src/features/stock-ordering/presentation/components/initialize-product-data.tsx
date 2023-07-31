import { useAppDispatch } from "features/config/hooks";
import { useEffect } from "react";
import { getProductData } from "../slices/get-product-data.slice";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";

interface InitializeProductDataProps {
  setRows: ((rows: TableRow) => void) | undefined;
  productData: GetProductDataModel | undefined;
}

export const InitializeProductData = (props: InitializeProductDataProps) => {
  useEffect(() => {
    if (
      props.productData &&
      props.productData.product_data &&
      props.productData.order_information
    ) {
      const order = props.productData?.order_information;
      const order_information: TableRow["order_information"] = {
        store_name: order.store_name,
        store_id: order.store_id,
        ship_to_address: order.ship_to_address,
        order_number: order.id,
        requested_delivery_date: order.requested_delivery_date,
        commited_delivery_date: order.commited_delivery_date,
        order_reviewed_date: order.reviewed_date,
        order_confirmation_date: order.order_confirmation_date,
        view_delivery_receipt: order.delivery_receipt,
        dispatch_date: order.dispatch_date,
        order_enroute: order.enroute_date,
        actual_delivery_date: order.actual_delivery_date,
        view_updated_delivery_receipt: order.updated_delivery_receipt,
        billing_information_ready:
          order.billing_id && order.billing_amount ? true : false,
        view_payment_details: order.payment_detail_image,
        payment_confirmation: order.payment_confirmation_date,
        transport_route: order.transport_route,
        remarks: order.remarks,
      };

      const productData: TableRow["product_data"] =
        props.productData.product_data.map((product) => ({
          id: product.id,
          productId: product.product_id,
          productName: product.product_name,
          uom: product.uom,
          orderQty: product.order_qty,
          commitedQuantity: product.commited_qty,
          deliveredQuantity: product.delivered_qty,
          dispatchedQuantity: product.dispatched_qty,
          total_cost: product.total_cost,
        }));

      props.setRows?.({
        order_information: order_information,
        product_data: productData,
      });
    }
  }, [props.productData]);

  return null;
};
