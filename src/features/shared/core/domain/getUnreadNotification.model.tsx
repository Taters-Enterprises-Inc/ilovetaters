import { NotificationModel } from "./notification.model";

export interface GetUnreadNotificationModel {
  Snackshop: Array<NotificationModel>;
  Catering: Array<NotificationModel>;
  Total_Notifications: {
    Snackshop: number;
    Catering: number;
  };
}
