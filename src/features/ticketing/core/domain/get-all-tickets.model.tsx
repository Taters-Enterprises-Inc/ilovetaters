/*
  READ FIRST:
  - This is interface is referenced from get-admin-user-discount.model.tsx
  - This is not the final interface, it is just a placeholder file/model.
  - This should be modified based on the API response once get-all-tickets API is ready.
  - THIS IS FOR TESTING PURPOSES ONLY.
*/

import { AllTicketModel } from "./all-ticket-model";

export interface GetAllTicketsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  discounts: Array<AllTicketModel>; // 👈 Change this to "tickets" once the API is ready.
}
