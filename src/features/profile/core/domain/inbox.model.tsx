export interface InboxModel {
  id: number;
  text: string;
  dateadded: string;
  survey_hash: string | null;
  notification_event_type_id: number | null;
  transaction_hash: number | null;
  catering_transaction_hash: number | null;
}
