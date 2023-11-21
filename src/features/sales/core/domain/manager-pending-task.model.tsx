export interface SalesManagerPendingTaskModel {
  task: Array<{
    id: string;
    store: string;
    entry_date: string;
    shift: string;
    cashier_name: string;
    grade: string;
  }>;
}
