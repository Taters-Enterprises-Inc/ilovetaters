import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";
import { getAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";

export const categoryType = [
  { id: 1, name: "frozen" },
  { id: 2, name: "dry" },
];

export const isValidFile = (
  file: string | File | undefined,
  isStore: boolean
): boolean => {
  if (!file) {
    return false;
  }

  if (typeof file === "string") {
    return true;
  }

  const allowedExtensions = isStore
    ? ["jpg", "jpeg", "png", "pdf", "xls", "xlsx"]
    : ["xls", "xlsx"];
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  const isValidExtension =
    fileExtension && allowedExtensions.includes(fileExtension);

  if (!isValidExtension) {
    return false;
  }

  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSizeInBytes) {
    return false;
  }

  return true;
};

export const isQuantityEmpty = (
  productData: GetProductDataModel["product_data"],
  process: number
) => {
  let empty = false;
  if (process === 1) {
    productData.map((product) => {
      if (
        product.commited_qty === "" ||
        product.commited_qty === null ||
        product.commited_qty === "0"
      ) {
        empty = true;
      }
    });
  } else if (process === 4) {
    productData.map((product) => {
      if (
        (product.delivered_qty === "" && !product.out_of_stock) ||
        (product.delivered_qty === null && !product.out_of_stock) ||
        (product.delivered_qty === "0" && !product.out_of_stock)
      ) {
        empty = true;
      }
    });
  }

  return empty;
};

export const dateSetup = (date: string, withTime: boolean) => {
  if (withTime) {
    return new Date(date).toLocaleDateString("en-PH", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    return new Date(date).toLocaleDateString("en-PH", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
};

export const eliminateTab = (payable: boolean, index: number) => {
  if (!payable) {
    return index === 6 || index === 7 || index === 8;
  } else {
    return (
      index === 0 ||
      index === 1 ||
      index === 2 ||
      index === 3 ||
      index === 4 ||
      index === 5
    );
  }
};

export const isPayableCheck = (
  payable: boolean,
  permission: AdminSessionModel["admin"]["user_details"]["sos_groups"]
) => {
  if (payable) {
    return permission.find(
      (perm) => perm.id === 7 || perm.id === 8 || perm.id === 9
    );
  } else {
    return permission.find(
      (perm) =>
        perm.id === 1 ||
        perm.id === 2 ||
        perm.id === 3 ||
        perm.id === 4 ||
        perm.id === 5 ||
        perm.id === 6 ||
        perm.id === 10
    );
  }
};
