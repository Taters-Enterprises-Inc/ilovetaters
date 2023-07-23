import { DeliverySchedule } from "./delivery-schedule.model";

export interface GetStockProductModel {
  products: [
    {
      product_id: string;
      product_name: string;
      uom: string;
      cost: string;
      orderQty: string;
    }
  ];
  schedule: DeliverySchedule | undefined;
}
