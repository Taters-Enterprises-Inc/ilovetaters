export interface GetProductDataModel {
  order_information: {
    store_name: string;
    store_id: string;
    id: string;
    ship_to_address: string;
    status_id: number;
    category_id: string;
    category_name: string;
    order_placement_date: string;
    requested_delivery_date: string;
    commited_delivery_date: string;
    order_confirmation_date: string;
    actual_delivery_date: string;
    description: string;
    short_name: string;
    reviewed_date: string;
    dispatch_date: string;
    payment_confirmation_date: string;
    transport_route: string;
    region_id: number;
    region_name: string;
    logistic_id: string;
    logistic_type: string;

    //files
    updated_delivery_goods_receipt: string;
    updated_delivery_region_receipt: string;
    payment_detail_image: string;
    delivery_receipt: string;
    updated_delivery_receipt: string;

    //Tracking
    tracking: Array<{
      datetime: string;
      first_name: string;
      last_name: string;
      name: string;
    }>;

    //remarks
    remarks: Array<{
      date: string;
      first_name: string;
      last_name: string;
      remarks: string;
    }>;
  };
  product_data: Array<{
    id: string;
    product_id: string;
    product_name: string;
    uom: string;
    category_id: string;
    order_qty: string;
    commited_qty: string;
    delivered_qty: string;
    total_cost: string;
    order_information_id: string;
    out_of_stock: boolean;
  }>;
}
