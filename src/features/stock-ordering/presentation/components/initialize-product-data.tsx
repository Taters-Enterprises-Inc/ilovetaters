import { useAppDispatch } from "features/config/hooks";
import { useEffect } from "react";
import { getProductData } from "../slices/get-product-data.slice";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";

interface InitializeProductDataProps {
  setRows: ((rows: StockOrderingInformationModel) => void) | undefined;
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
      const order_information: StockOrderingInformationModel["order_information"] =
        {
          store_name: order.store_name,
          store_id: order.store_id,
          ship_to_address: order.ship_to_address,
          order_number: order.id,
          requested_delivery_date: order.requested_delivery_date,
          commited_delivery_date: order.commited_delivery_date,
          order_reviewed_date: order.reviewed_date,
          view_delivery_receipt: order.delivery_receipt,
          dispatch_date: order.dispatch_date,
          actual_delivery_date: order.actual_delivery_date,
          view_updated_delivery_receipt: order.updated_delivery_receipt,
          view_payment_details: order.payment_detail_image,
          payment_confirmation: order.payment_confirmation_date,
          transport_route: order.transport_route,
          region_id: order.region_id,
          remarks: order.remarks,
          updated_delivery_goods_receipt: order.updated_delivery_goods_receipt,
          updated_delivery_region_receipt:
            order.updated_delivery_region_receipt,
        };

      const productData: StockOrderingInformationModel["product_data"] =
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
