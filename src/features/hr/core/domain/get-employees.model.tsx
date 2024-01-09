import { EmployeeModel } from "./employee.model";

export interface GetEmployeesModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  employees: Array<EmployeeModel>;
}
