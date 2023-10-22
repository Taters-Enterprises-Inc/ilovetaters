import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";

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
      if (product.commited_qty === "" || product.commited_qty === null) {
        empty = true;
      }
    });
  } else if (process === 4) {
    productData.map((product) => {
      if (product.delivered_qty === "" || product.delivered_qty === null) {
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
