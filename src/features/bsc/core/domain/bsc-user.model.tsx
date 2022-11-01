import { GroupModel } from "./bsc-group.model";

export interface BscUserModel {
  id: number;
  user_status_id: 1 | 2 | 3;
  active: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  designation: string;

  groups: Array<{
    id: number;
    name: string;
  }>;

  stores: Array<{
    store_id: number;
    name: string;
  }>;

  companies: Array<{
    id: number;
    name: string;
  }>;
}
