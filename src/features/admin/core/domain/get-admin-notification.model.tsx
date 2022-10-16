import { NotificationModel } from "features/shared/core/domain/notification.model";

export interface GetAdminNotificationModel {
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
}
