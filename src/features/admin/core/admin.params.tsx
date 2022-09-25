export interface EditAdminUserParam {
  formData: FormData;
  userId: string;
}

export interface UpdateStoreDealParam {
  id: string;
  status: "1" | "0";
}
