export interface GetPayBillingSiModel {
  orders: Array<{
    si: string;
    order_id: string;
    store: string;
    order_placement_date: string;
    requested_delivery_date: string;
    commited_delivery_date: string;
  }>;
}
