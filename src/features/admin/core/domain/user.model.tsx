import { GroupModel } from "./group.model";

export interface UserModel {
  id: number;
  active: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  groups: GroupModel["shop"];
  stockOrderGroup: GroupModel["stock_order"];
  salesGroup: GroupModel["sales"];
}
