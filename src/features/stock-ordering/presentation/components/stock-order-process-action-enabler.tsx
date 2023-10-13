import React from "react";
import { StockOrderProcessSupplierViewOrder } from "./stock-order-process-supplier-view-order";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";

interface StockOrderProcessActionEnablerProps {
  tab: number;
  orderId: string;
  row: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessActionEnabler(
  props: StockOrderProcessActionEnablerProps
) {
  if (props.tab === 0)
    return (
      <StockOrderProcessSupplierViewOrder
        orderid={props.orderId}
        rows={props.row}
        onClose={props.onClose}
      />
    );

  return null;
}
