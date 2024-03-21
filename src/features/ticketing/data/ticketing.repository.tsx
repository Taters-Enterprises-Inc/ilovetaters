import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetAllTicketsModel } from "../core/domain/get-all-tickets.model";
import { ticketingTicketParam } from "../core/ticketing.params";
import { GetTicketModel } from "../core/domain/get-ticket.model";

export interface GetTicketResponse {
  data: {
    message: string;
    data: GetTicketModel;
  };
}

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

export interface ticketingSubmitTicketResponse {
  data: {
    message: string;
  };
}

export function GetTicketRepository(id: string): Promise<GetTicketResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/ticketing/ticket/${id}`, {
    withCredentials: true,
  });
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
  return axios.get(`${REACT_APP_DOMAIN_URL}api/ticketing/my-tickets${query}`, {
    withCredentials: true,
  });
}

export function ticketingSubmitTicketRepository(
  param: ticketingTicketParam
): Promise<ticketingSubmitTicketResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/ticketing/submit-ticket`,
    param,
    {
      withCredentials: true,
    }
  );
}
