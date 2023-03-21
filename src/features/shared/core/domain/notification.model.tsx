export interface NotificationModel {
  id: number;

  transaction_tb_id: number;
  catering_transaction_tb_id: number;
  deals_redeems_tb_id: number;
  discount_user_id: number;
  influencer_id: number;

  tracking_no: string;
  catering_tracking_no: string;
  redeem_code: string;

  text: string;
  dateadded: string;
  dateseen: string;
  notification_event_type_id: number;
  customer_survey_response_id: number;
}
