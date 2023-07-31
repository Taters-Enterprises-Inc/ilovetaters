export interface GetStockStoreModel {
  stores: Array<{
    store_id: string;
    name: string;
  }>;
  ship_to_address: Array<{
    ship_to_address: string;
    store_id: string;
  }>;
  window_time: {
    end_Time: string;
    start_time: string;
  };
}
