import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetAllTicketsModel } from "../core/domain/get-all-tickets.model";

export interface GetAllTicketsResponse {
  data: {
    message: string;
    data: GetAllTicketsModel;
  };
}

export function GetAllTicketsRepository(
  query: string
): Promise<GetAllTicketsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/ticketing/tickets${query}`, {
    withCredentials: true,
  });
}
