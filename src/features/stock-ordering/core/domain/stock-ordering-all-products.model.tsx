export interface StockOrderingSettingsProducts {
  products: Array<{
    id: string;
    product_id: string;
    product_name: string;
    uom_qty: string;
    uom: string;
    cost: string;
    category_id: string;
    active_status: number;
  }>;

  pagination: {
    total_rows: number;
    per_page: number;
  };
}
