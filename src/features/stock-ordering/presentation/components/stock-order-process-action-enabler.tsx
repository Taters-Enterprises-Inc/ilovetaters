import React from "react";
import { StockOrderProcessSupplierViewOrder } from "./stock-order-process-supplier-view-order";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { StockOrderProcessProcurementReviewOrder } from "./stock-order-process-procurement-review-order";
import { StockOrderProcessSupplierDispatchOrder } from "./stock-order-process-supplier-dispatch-order";

interface StockOrderProcessActionEnablerProps {
  tab: number;
  orderId: string;
  row: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessActionEnabler(
  props: StockOrderProcessActionEnablerProps
) {
  switch (props.tab) {
    case 0:
      return (
        <StockOrderProcessSupplierViewOrder
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );
      break;
    case 1:
      return (
        <StockOrderProcessProcurementReviewOrder
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );
      break;
    case 2:
      return (
        <StockOrderProcessSupplierDispatchOrder
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );
      break;
  }

  return null;
}
