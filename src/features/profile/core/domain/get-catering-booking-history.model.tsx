import { CateringBookingModel } from "./catering-booking.model";

export interface GetCateringBookingHistoryModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  bookings: Array<CateringBookingModel>;
}
