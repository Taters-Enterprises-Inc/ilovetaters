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
    id: number;
    name: string;
  }>;

  stores: Array<{
    id: number;
    name: string;
  }>;

  companies: Array<{
    id: number;
    name: string;
  }>;
}
