import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { SalesActiveFieldsModel } from "../core/domain/active-fields.model";
import { SubmitFormParam } from "../core/sales.param";

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
