import { UserModel } from "./bsc-user.model";

export interface GetBscUsersModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  users: Array<UserModel>;
}
