import axios from "axios";
import { DepartmentModel } from "features/hr/core/domain/department.model";
import { EmployeeInfoModel } from "features/hr/core/domain/employee-info.model";
import { GetEmployeesModel } from "features/hr/core/domain/get-employees.model";
import { GetUserEmployeesModel } from "features/hr/core/domain/get-user-employees.model";
import { HrActionItemsModel } from "features/hr/core/domain/hr-action-items.model";
import { HrDirectReportStaffActionItemsModel } from "features/hr/core/domain/hr-direct-report-staff-action-items.model";
import { HrDirectReportStaffKrasModel } from "features/hr/core/domain/hr-direct-report-staff-kras.model";
import { HrSessionModel } from "features/hr/core/domain/hr-session.model";
import {
  LoginHrParam,
  UpdateActionItemParam,
} from "features/hr/core/hr.params";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface GetHrSessionResponse {
  data: {
    message: string;
    data: HrSessionModel;
  };
}

export interface LoginHrResponse {
  data: {
    message: string;
  };
}
export interface LogoutHrResponse {
  data: {
    message: string;
  };
}

export interface GetHrActionItemsResponse {
  data: {
    message: string;
    data: HrActionItemsModel;
  };
}

export interface UpdateActionItemResponse {
  data: {
    message: string;
  };
}
export interface GetHrDirectReportStaffActionItemsResponse {
  data: {
    message: string;
    data: HrDirectReportStaffActionItemsModel;
  };
}

export interface GetHrDirectReportStaffKrasResponse {
  data: {
    message: string;
    data: HrDirectReportStaffKrasModel;
  };
}

export interface GetEmployeesResponse {
  data: {
    message: string;
    data: GetEmployeesModel;
  };
}

export interface GetDepartmentsResponse {
  data: {
    message: string;
    data: Array<DepartmentModel>;
  };
}

export interface GetUserEmployeesResponse {
  data: {
    message: string;
    data: GetUserEmployeesModel;
  };
}

export interface GetEmployeeInfoResponse {
  data: {
    message: string;
    data: EmployeeInfoModel;
  };
}

export function GetEmployeeInfoRepository(
  userId: string
): Promise<GetEmployeeInfoResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/hr/employee/info/${userId}`, {
    withCredentials: true,
  });
}

export function GetUserEmployeesRepository(
  query: string
): Promise<GetUserEmployeesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/hr/user/employees${query}`, {
    withCredentials: true,
  });
}

export function GetDepartmentsRepository(): Promise<GetDepartmentsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/hr/departments`, {
    withCredentials: true,
  });
}

export function GetEmployeesRepository(
  query: string
): Promise<GetEmployeesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/hr/employees${query}`, {
    withCredentials: true,
  });
}

export function GetHrDirectReportStaffKrasRepository(
  action_item_id: number
): Promise<GetHrDirectReportStaffKrasResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/direct-report-staff/kras/${action_item_id}`,
    {
      withCredentials: true,
    }
  );
}

export function GetHrDirectReportStaffActionItemsRepository(
  id: number
): Promise<GetHrDirectReportStaffActionItemsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/direct-report-staff/action-items/${id}`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateActionItemRepository(
  param: UpdateActionItemParam
): Promise<UpdateActionItemResponse> {
  return axios.put(`${REACT_APP_DOMAIN_URL}api/hr/action-items`, param, {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetHrActionItemsRepository(): Promise<GetHrActionItemsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/hr/action-items`, {
    withCredentials: true,
  });
}

export function LogoutHrRepository(): Promise<LogoutHrResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/auth-hr/logout`, {
    withCredentials: true,
  });
}

export function GetHrSessionRepository(): Promise<GetHrSessionResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/hr/session`, {
    withCredentials: true,
  });
}

export function LoginHrRepository(
  param: LoginHrParam
): Promise<LoginHrResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth-hr/login`, param, {
    withCredentials: true,
  });
}
