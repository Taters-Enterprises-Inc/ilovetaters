import { NotificationModel } from "./notification.model";

export interface GetNotificationsModel {
  snackshop: {
    notifications: Array<NotificationModel>;
    count: number;
  };
  catering: {
    notifications: Array<NotificationModel>;
    count: number;
  };
}
