import { InboxModel } from "./inbox.model";

export interface GetInboxModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  inbox: Array<InboxModel>;
}
