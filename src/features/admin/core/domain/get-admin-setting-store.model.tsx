import { AdminPackageModel } from "./admin-package.model";
import { AdminProductModel } from "./admin-product.model";

export interface GetAdminSettingStoreModel {
  store_id: number;
  name: string;
  address: string;
  contact_number: string;
  contact_person: string;
  email: string;
  delivery_hours: string;
  operating_hours: string;
  delivery_rate: string;
  minimum_rate: string;
  catering_delivery_rate: string;
  catering_minimum_rate: string;
  store_hash: string;
  active_reseller_region_id: number;
  available_start_time: string;
  available_end_time: string;
  store_menu_type_id: number;
  locale: string;
  region_id: number;
  region_store_combination_tb_id: number;
  lat: number;
  lng: number;
  status: string;
  catering_status: number;
  popclub_walk_in_status: number;
  popclub_online_delivery_status: number;
  branch_status: number;
  store_image: string;
  services: Array<string>;
  products: Array<AdminProductModel>;
  packages: Array<AdminPackageModel>;
}
