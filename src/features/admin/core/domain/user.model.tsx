import { GroupModel } from "./group.model";

export interface UserModel {
  id: number;
  active: number;
  first_name: number;
  last_name: number;
  email: string;
  phone: string;
  company: string;
  groups: Array<GroupModel>;
}
