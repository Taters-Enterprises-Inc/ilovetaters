export interface DeliveryScheduleModel {
  id: string;
  store_id: string;
  leadtime: string;
  is_mwf: boolean;
  is_tths: boolean;
}
