export interface StockOrderingInformationModel {
  order_information: {
    store_name: string;
    store_id: string;
    ship_to_address: string;
    order_number: string;
    requested_delivery_date: string;
    commited_delivery_date: string;
    order_reviewed_date: string;
    view_delivery_receipt: string;
    dispatch_date: string;
    actual_delivery_date: string;
    view_updated_delivery_receipt: string;
    view_payment_details: string;
    payment_confirmation: string;
    transport_route: string;
    region_id: number;
    remarks: {
      date: string;
      first_name: string;
      last_name: string;
      remarks: string;
    }[];
    updated_delivery_goods_receipt: string;
    updated_delivery_region_receipt: string;
  };
  product_data: {
    id: string;
    productId: string;
    productName: string;
    uom: string;
    orderQty: string;
    commitedQuantity: string;
    deliveredQuantity: string;
    dispatchedQuantity: string;
    total_cost: string;
  }[];
}
