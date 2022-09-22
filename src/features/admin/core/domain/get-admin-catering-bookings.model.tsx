import { AdminCateringBookingsModel } from "./admin-catering-bookings.model";

export interface GetAdminCateringBookingsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  bookings: Array<AdminCateringBookingsModel>;
}
