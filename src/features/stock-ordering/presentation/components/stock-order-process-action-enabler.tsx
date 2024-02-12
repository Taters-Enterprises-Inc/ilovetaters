import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import {
  StockOrderProcessCompleted,
  StockOrderProcessFranchiseePayBill,
  StockOrderProcessProcurementReviewOrder,
  StockOrderProcessStoreManagerDeliveryRecieveOrderApproval,
  StockOrderProcessStoreRecieveOrder,
  StockOrderProcessSupplierConfirmPayment,
  StockOrderProcessSupplierDispatchOrder,
  StockOrderProcessSupplierUpdateBilling,
  StockOrderProcessSupplierViewOrder,
} from ".";

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
    case 1:
      return (
        <StockOrderProcessProcurementReviewOrder
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );

    case 2:
      return (
        <StockOrderProcessFranchiseePayBill
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );

    case 3:
      return (
        <StockOrderProcessSupplierDispatchOrder
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );

    case 4:
      return (
        <StockOrderProcessStoreRecieveOrder
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );

    case 5:
      return (
        <StockOrderProcessStoreManagerDeliveryRecieveOrderApproval
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );
    case 6:
      return (
        <StockOrderProcessSupplierUpdateBilling
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );

    // case 7:
    //   return (
    //     <StockOrderProcessSupplierConfirmPayment
    //       orderId={props.orderId}
    //       rows={props.row}
    //       onClose={props.onClose}
    //     />
    //   );

    case 8:
      return (
        <StockOrderProcessSupplierConfirmPayment
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );

    case 9:
      return (
        <StockOrderProcessCompleted
          orderId={props.orderId}
          rows={props.row}
          onClose={props.onClose}
        />
      );
  }

  return null;
}
