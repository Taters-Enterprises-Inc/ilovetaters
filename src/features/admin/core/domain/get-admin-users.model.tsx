import { UserModel } from "./user.model";

export interface GetAdminUsersModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  users: Array<UserModel>;
}
