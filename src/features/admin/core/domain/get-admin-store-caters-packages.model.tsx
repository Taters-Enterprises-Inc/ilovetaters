import { AdminStoreCatersPackageModel } from "./admin-store-caters-package.model";

export interface GetAdminStoreCatersPackagesModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  caters_packages: Array<AdminStoreCatersPackageModel>;
}
