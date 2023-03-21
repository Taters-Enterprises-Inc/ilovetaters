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
  survey_verification: {
    notifications: Array<NotificationModel>;
    unseen_notifications: Array<NotificationModel>;
    unseen_notifications_count: number;
  };
  user_discount: {
    notifications: Array<NotificationModel>;
    unseen_notifications: Array<NotificationModel>;
    unseen_notifications_count: number;
  };
  influencer: {
    notifications: Array<NotificationModel>;
    unseen_notifications: Array<NotificationModel>;
    unseen_notifications_count: number;
  };
}
