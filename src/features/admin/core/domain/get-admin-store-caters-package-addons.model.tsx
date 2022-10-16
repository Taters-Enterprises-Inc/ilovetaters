import { AdminStoreCatersPackageAddonModel } from "./admin-store-caters-package-addon.model";

export interface GetAdminStoreCatersPackageAddonsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  caters_package_addons: Array<AdminStoreCatersPackageAddonModel>;
}
