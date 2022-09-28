import { StoreModel } from "./store.model";

export interface RegionModel {
  region_name: string;
  stores: Array<StoreModel>;
}
