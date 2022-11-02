export interface LoginBscParam {
  identity: string;
  password: string;
}

export interface CreateBscUserParam {
  email: string;
  password: string;
  confirmPassword: string;

  firstName: string;
  lastName: string;
  designation: string;
  store: string;
  phoneNumber: string;
  company: string;
}

export interface UpdateBscUserStatusParam {
  user_id: string;
  status: string;
}

export interface UpdateBscUserParam {
  userId: string;
  firstName: string;
  lastName: string;
  designation: string;
  company: string;
  store: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  groups: Array<number> | null;
}
