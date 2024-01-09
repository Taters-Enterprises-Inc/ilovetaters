import { UserEmployeeModel } from "./user-employee.model";

export interface GetUserEmployeesModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  employees: Array<UserEmployeeModel>;
}
