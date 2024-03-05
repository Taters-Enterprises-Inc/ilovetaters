/*
  READ FIRST:
  - This is interface is referenced from admin-user-discount.model.tsx
  - This is not the final interface, it is just a placeholder file/model.
  - This should be modified based on the API response once all-tickets API is ready.
  - THIS IS FOR TESTING PURPOSES ONLY.
*/

export interface AllTicketModel {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  birthday: string;
  id_number: string;
  id_front: string;
  id_back: string;
  dateadded: string;
  discount_id: number;
  discount_name: string;
  status: number;

  fb_first_name: string;
  fb_last_name: string;

  mobile_first_name: string;
  mobile_last_name: string;
}
