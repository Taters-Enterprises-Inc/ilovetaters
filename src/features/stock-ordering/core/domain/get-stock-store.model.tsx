export interface GetStockStoreModel {
  stores: Array<{
    store_id: string;
    name: string;
  }>;
  address: Array<{
    ship_to_address: string;
  }>;
  window_time: {
    end_Time: string;
    start_time: string;
  };
}
