export interface GetAuditStoreModel {
  store_type: Array<{
    id: number;
    type_name: string;
  }>;

  stores: Array<{
    store_id: number;
    name: string;
  }>;
}
