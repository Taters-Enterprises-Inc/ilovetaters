export interface GetStockStoreModel {
  stores: Array<{
    store_id: string;
    name: string;
    franchise_type_id: string;
  }>;
  address: Array<{
    ship_to_address: string;
  }>;
  window_time: {
    end_Time: string;
    start_time: string;
  };
}
