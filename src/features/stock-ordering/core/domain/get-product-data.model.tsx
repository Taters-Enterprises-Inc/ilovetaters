export interface GetProductDataModel {
  order_information: {
    store_name: string;
    id: string;
    ship_to_address: string;
    category_name: string;
    order_placement_date: string;
    requested_delivery_date: string;
    commited_delivery_date: string;
    order_confirmation_date: string;
    actual_delivery_date: string;
    description: string;
    billing_id: string;
    billing_amount: string;
    short_name: string;
    reviewed_date: string;
    dispatch_date: string;
    enroute_date: string;
    payment_confirmation_date: string;
    delivery_receipt: string;
    updated_delivery_receipt: string;
    payment_detail_image: string;
    transport_route: string;
    remarks: Array<{
      date: string;
      first_name: string;
      last_name: string;
      remarks: string;
    }>;
  };
  product_data: [
    {
      id: string;
      product_id: string;
      product_name: string;
      uom: string;
      category_id: string;
      order_qty: string;
      commited_qty: string;
      delivered_qty: string;
      dispatched_qty: string;
      total_cost: string;
      order_information_id: string;
    }
  ];
}
