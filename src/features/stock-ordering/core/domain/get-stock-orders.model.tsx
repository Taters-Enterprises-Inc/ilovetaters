export interface GetStockOrdersModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  orders: [
    {
      id: string;
      store_name: string;
      category_name: string;
      order_placement_date: string;
      requested_delivery_date: string;
      commited_delivery_date: null | string;
      order_confirmation_date: null | string;
      actual_delivery_date: null | string;
      description: null | string;
      billing_id: null | string;
      billing_amount: null | string;
      short_name: string;
    }
  ];
}
