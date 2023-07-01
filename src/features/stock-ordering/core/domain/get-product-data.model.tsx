export interface GetProductDataModel {
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
      total_cost: string;
      order_information_id: string;
    }
  ];
}
