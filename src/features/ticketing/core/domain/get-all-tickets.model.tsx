import { AllTicketModel } from "./all-ticket-model";

export interface GetAllTicketsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  tickets: Array<AllTicketModel>;
}
