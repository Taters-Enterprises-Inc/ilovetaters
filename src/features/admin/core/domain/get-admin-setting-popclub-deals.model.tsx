export interface GetAdminSettingPopclubDealsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  popclub_deals: Array<{
    id: number;
    product_image: string;
    name: string;
    original_price: number;
    promo_price: number;
    description: string;
    status: number;
  }>;
}
