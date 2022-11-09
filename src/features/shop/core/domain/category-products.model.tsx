export interface CategoryProductsModel {
  category_id: number;
  category_name: string;
  category_details: string;
  category_image: string;
  category_background: string;
  visibility: null;
  category_products: Array<{
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    promo_discount_percentage: string | null;
    hash: string;
  }>;
}
