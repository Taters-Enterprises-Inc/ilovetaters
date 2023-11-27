import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { SalesActiveFieldsModel } from "../core/domain/active-fields.model";
import { CheckParam, SubmitFormParam } from "../core/sales.param";
import { SalesTCPendingTaskModel } from "../core/domain/tc-pending-task.model";
import { SalesManagerPendingTaskModel } from "../core/domain/manager-pending-task.model";
import { SalesCashierSavedFormModel } from "../core/domain/cashier-saved-form.model";
import { SalesFormDataModel } from "../core/domain/sales-form-data.model";
import { SalesCompletedModel } from "../core/domain/sales-complete.model";

export interface GetSalesActiveFieldsResponse {
  data: {
    message: string;
    data: SalesActiveFieldsModel;
  };
}

export interface salesSubmitFormResponse {
  data: {
    message: string;
  };
}

export interface GetSalesTCPendingTaskResponse {
  data: {
    message: string;
    data: SalesTCPendingTaskModel;
  };
}

export interface GetSalesManagerPendingTaskResponse {
  data: {
    message: string;
    data: SalesManagerPendingTaskModel;
  };
}

export interface GetSalesCashierSavedFormResponse {
  data: {
    message: string;
    data: SalesCashierSavedFormModel;
  };
}

export interface salesSubmitVerdictResponse {
  data: {
    message: string;
  };
}

export interface GetSalesFormDataResponse {
  data: {
    message: string;
    data: Array<SalesFormDataModel>;
  };
}

export interface GetSalesCompletedResponse {
  data: {
    message: string;
    data: SalesCompletedModel;
  };
}

export function GetSalesActiveFieldsRepository(): Promise<GetSalesActiveFieldsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/sales/fields`, {
    withCredentials: true,
  });
}

export function salesSubmitFormRepository(
  param: SubmitFormParam
): Promise<salesSubmitFormResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/sales/fields`, param, {
    withCredentials: true,
  });
}

export function GetSalesTCPendingTaskRepository(): Promise<GetSalesTCPendingTaskResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/sales/tc-task`, {
    withCredentials: true,
  });
}

export function GetSalesManagerPendingTaskRepository(): Promise<GetSalesManagerPendingTaskResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/sales/manager-task`, {
    withCredentials: true,
  });
}

export function GetSalesCashierSavedFormRepository(): Promise<GetSalesCashierSavedFormResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/sales/saved-forms`, {
    withCredentials: true,
  });
}

export function salesSubmitVerdictRepository(
  param: CheckParam
): Promise<salesSubmitVerdictResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/sales/submit_verdict`, param, {
    withCredentials: true,
  });
}

export function GetSalesFormDataRepository(
  param: string
): Promise<GetSalesFormDataResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/sales/form-data${param}`, {
    withCredentials: true,
  });
}

export function GetSalesCompletedRepository(): Promise<GetSalesCompletedResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/sales/dashboard`, {
    withCredentials: true,
  });
}
