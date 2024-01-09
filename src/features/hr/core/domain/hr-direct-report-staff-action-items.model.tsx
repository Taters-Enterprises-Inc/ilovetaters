export interface HrDirectReportStaffActionItemsModel {
  action_items: Array<{
    id: number;
    item_id: number;
    item_name: string;
    status_id: number;
    status: string;

    staff_id: number;
    staff_name: string;
    staff_position: string;
    staff_employee_number: string;
    staff_hiring_date: string;
    staff_email: string;
  }>;
}
