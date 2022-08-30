export interface StoreModel {
  region_name: string;
  stores: Array<{
    store_id: number;
    store_distance: number;
    store_name: string;
    store_address: number;
    menu_type: number;
    store_image: string;
    region_store_id: string;
    action: string;
    opening_time: string;
    closing_time: string;
  }>;
}
