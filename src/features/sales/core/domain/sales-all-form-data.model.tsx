import { SalesFormDataModel } from "./sales-form-data.model";

export interface SalesAllFormDataModel {
  cashier_data: Array<SalesFormDataModel>;
  manager_data: Array<SalesFormDataModel>;
  tc_data: Array<SalesFormDataModel>;
}
