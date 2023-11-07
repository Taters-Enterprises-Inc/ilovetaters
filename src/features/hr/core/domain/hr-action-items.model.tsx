export interface HrActionItemsModel {
  action_items: Array<{
    id: number;
    module: string;
    item: string;
    status: string;
    status_id: number;
    item_id: number;
  }>;
}
