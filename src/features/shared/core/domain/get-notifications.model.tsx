import { NotificationModel } from "./notification.model";

export interface GetNotificationsModel {
  all: {
    notifications: Array<NotificationModel>;
    unseen_notifications: Array<NotificationModel>;
    unseen_notifications_count: number;
  };
  snackshop_order: {
    notifications: Array<NotificationModel>;
    unseen_notifications: Array<NotificationModel>;
    unseen_notifications_count: number;
  };
  catering_booking: {
    notifications: Array<NotificationModel>;
    unseen_notifications: Array<NotificationModel>;
    unseen_notifications_count: number;
  };
  popclub_redeem: {
    notifications: Array<NotificationModel>;
    unseen_notifications: Array<NotificationModel>;
    unseen_notifications_count: number;
  };
  inbox: {
    notifications: Array<NotificationModel>;
    unseen_notifications: Array<NotificationModel>;
    unseen_notifications_count: number;
  };
}
