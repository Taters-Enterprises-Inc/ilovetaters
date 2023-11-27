export interface SalesCompletedModel {
  approved_count: number;
  not_approved_count: number;
  total_count: number;
  completed: Array<{
    id: number;
    cashier_first_name: string;
    cashier_last_name: string;
    tc_first_name: string;
    tc_last_name: string;
    manager_first_name: string;
    manager_last_name: string;
    entry_date: string;
    store: string;
    shift: string;
    tc_grade: string;
    manager_grade: string;
  }>;
}
