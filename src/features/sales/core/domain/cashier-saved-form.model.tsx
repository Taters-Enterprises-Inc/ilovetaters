export interface SalesCashierSavedFormModel {
  saved_forms: Array<{
    id: string;
    store: string;
    entry_date: string;
    shift: string;
  }>;
}
