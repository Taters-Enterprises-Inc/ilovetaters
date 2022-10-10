import { AdminStorePackageModel } from "./admin-store-package.model";

export interface GetAdminStorePackagesModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  packages: Array<AdminStorePackageModel>;
}
