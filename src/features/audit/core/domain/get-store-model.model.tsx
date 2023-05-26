export interface GetAuditStoreModel {
  stores: Array<{
    id: string;
    store_type_id: string;
    store_code: string;
    store_name: string;
    type_name: string;
  }>;
}
