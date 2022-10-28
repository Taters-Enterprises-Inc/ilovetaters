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

export interface EditBscUserParam {
  formData: FormData;
  userId: string;
}

export interface UpdateBscUserStatusParam {
  user_id: string;
  status: string;
}
