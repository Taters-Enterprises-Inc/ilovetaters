export interface GetAuditStoreModel {
  stores: Array<{
    id: string;
    mall_type: string;
    store_type_id: string;
    store_code: string;
    store_name: string;
    type_name: string;
  }>;
}
