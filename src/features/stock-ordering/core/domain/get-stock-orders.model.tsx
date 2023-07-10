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
      commited_delivery_date: string;
      order_confirmation_date: string;
      actual_delivery_date: string;
      description: string;
      billing_id: string;
      billing_amount: string;
      short_name: string;
    }
  ];

  tab: number[];
}
