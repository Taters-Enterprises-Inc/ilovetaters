import { GroupModel } from "./bsc-group.model";

export interface BscUserModel {
  id: number;
  user_status_id: 1 | 2 | 3;
  active: number;
  first_name: number;
  last_name: number;
  email: string;
  phone: string;
  designation: string;

  groups: Array<{
    name: string;
  }>;

  stores: Array<{
    name: string;
  }>;

  companies: Array<{
    name: string;
  }>;
}
