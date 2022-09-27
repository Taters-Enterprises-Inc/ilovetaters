import { AdminSettingStores } from "./admin-setting-stores.model";

export interface GetAdminSettingStoresModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  stores: Array<AdminSettingStores>;
}
