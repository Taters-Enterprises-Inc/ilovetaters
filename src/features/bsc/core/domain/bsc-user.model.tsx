import { GroupModel } from "./bsc-group.model";

export interface UserModel {
  id: number;
  user_status_id: 1 | 2 | 3;
  active: number;
  first_name: number;
  last_name: number;
  email: string;
  phone: string;
  company: string;
  groups: Array<GroupModel>;
}
