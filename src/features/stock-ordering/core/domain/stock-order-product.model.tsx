export interface StockOrderProductModel {
  products_data: {
    product_id: string;
    product_name: string;
    uom: string;
    cost: number;
    category_id: number;
  };
  stores: Array<{ name: string; store_id: number }>;
}
