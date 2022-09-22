import { AdminCateringBookingModel } from "./admin-catering-booking.model";

export interface GetAdminCateringBookingsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  bookings: Array<AdminCateringBookingModel>;
}
