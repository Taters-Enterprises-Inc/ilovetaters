export interface InboxModel {
  id: number;
  text: string;
  dateadded: string;
  survey_hash: string | null;
  invoice_no: string;
  notification_event_type_id: number | null;
  transaction_hash: number | null;
  catering_transaction_hash: number | null;

  title: string | null;
  body: string | null;
  closing: string | null;
  closing_salutation: string | null;
  image_title: string | null;
  image_url: string | null;
  internal_link_title: string | null;
  internal_link_url: string | null;
  message_from: string | null;
  email: string | null;
  contact_number: string | null;
}
