import { MyTicketModel } from "./my-ticket-model";

export interface GetMyTicketsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  tickets: Array<MyTicketModel>;
}
