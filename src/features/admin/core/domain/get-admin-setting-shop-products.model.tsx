export interface GetAdminSettingShopProductsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  shop_products: Array<{
    id: number;
    product_image: string;
    name: string;
    description: string;
    price: number;
    add_details: string;
    status: number;
    popclub_status: number;
  }>;
}
