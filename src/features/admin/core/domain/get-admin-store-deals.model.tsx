import { AdminStoreDealModel } from "./admin-store-deal.model";

export interface GetAdminStoreDealsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  deals: Array<AdminStoreDealModel>;
}

export interface GetAdminStoreDealsByIdModel {
  deals: Array<any>;
}
