export interface GetAdminSettingCateringPackagesModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  catering_packages: Array<{
    id: number;
    product_image: string;
    name: string;
    description: string;
    price: number;
    add_details: string;
    status: number;
  }>;
}
