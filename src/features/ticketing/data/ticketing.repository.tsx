import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetAllTicketsModel } from "../core/domain/get-all-tickets.model";

export interface GetAllTicketsResponse {
  data: {
    message: string;
    data: GetAllTicketsModel;
  };
}

export interface GetMyTicketsResponse {
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

// 👇 Edit this axios call to match the actual API endpoint, the current one is for testing MyTickets only. 👇
export function GetMyTicketsRepository(
  query: string
): Promise<GetAllTicketsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/ticketing/tickets${query}`, {
    withCredentials: true,
  });
}
