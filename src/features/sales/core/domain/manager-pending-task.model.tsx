export interface SalesManagerPendingTaskModel {
  task: Array<{
    id: string;
    store: string;
    entry_date: string;
    shift: string;
    cashier_name: string;
    grade: string;
    tc_first_name: string;
    tc_last_name: string;
    tc_grade: string;
  }>;
}
