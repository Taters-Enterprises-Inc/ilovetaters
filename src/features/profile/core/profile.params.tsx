export interface ApplyUserDiscountParam {
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  idNumber: string;
  idFront: string;
  idBack: string;
  discountTypeId: number;
}

export interface UpdateUserDiscountParam {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  idNumber: string;
  idFront: string;
  idBack: string;
  discountTypeId: number;
}
