import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { SalesActiveFieldsModel } from "../core/domain/active-fields.model";

export interface GetSalesActiveFieldsResponse {
  data: {
    message: string;
    data: SalesActiveFieldsModel;
  };
}

export function GetSalesActiveFieldsRepository(): Promise<GetSalesActiveFieldsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/sales/fields`, {
    withCredentials: true,
  });
}
