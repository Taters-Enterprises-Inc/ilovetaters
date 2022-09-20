import { GroupModel } from "./group-model";

export interface UserModel {
  id: number;
  first_name: number;
  last_name: number;
  email: string;
  groups: Array<GroupModel>;
}
