import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import {
  MaterialInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectGetStockOrderAllStores,
  GetStockOrderAllStoresState,
  getStockOrderAllStores,
} from "../slices/stock-order-get-all-stores.slice";
import { categoryType } from "./stock-ordering-utils";
import {
  GetStockOrderSettingProductsEditState,
  getStockOrderSettingProductsEdit,
  resetGetStockOrderSettingProductsEditStatus,
  selectGetStockOrderSettingProductsEdit,
} from "../slices/stock-order-get-settings-products-edit.slice";
import { stockOrderSettingsProductParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  selectstockOrderEditProduct,
  stockOrderEditProduct,
  stockOrderEditProductState,
} from "../slices/stock-order-settings-product-edit.slice";

interface formData {
  productId: string;
  productName: string;
  uom: string;
  categoryType: { id: number | undefined; name: string } | null;
  cost: number | null;
  stores: Array<{
    name: string;
    store_id: number;
  }> | null;
}

export function StockOrderSettingsProductEditContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const getAllStoreState = useAppSelector(selectGetStockOrderAllStores);
  const editProductState = useAppSelector(selectstockOrderEditProduct);
  const getSettingsEditProductDataState = useAppSelector(
    selectGetStockOrderSettingProductsEdit
  );

  const [formState, setFormState] = useState<formData>({
    productId: "",
    productName: "",
    uom: "",
    categoryType: null,
    cost: null,
    stores: null,
  });

  useEffect(() => {
    dispatch(getStockOrderAllStores());
    if (id) {
      dispatch(resetGetStockOrderSettingProductsEditStatus());
      dispatch(getStockOrderSettingProductsEdit(id ?? ""));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      getAllStoreState.data &&
      getAllStoreState.status === GetStockOrderAllStoresState.success
    ) {
      setFormState({
        productId:
          getSettingsEditProductDataState.data?.products_data.product_id ?? "",
        productName:
          getSettingsEditProductDataState.data?.products_data.product_name ??
          "",
        uom: getSettingsEditProductDataState.data?.products_data.uom ?? "",
        categoryType:
          categoryType.find(
            (type) =>
              type.id ===
              getSettingsEditProductDataState.data?.products_data.category_id
          ) ?? null,
        cost: getSettingsEditProductDataState.data?.products_data.cost ?? null,
        stores: getSettingsEditProductDataState.data?.stores ?? null,
      });
    }
  }, [
    getAllStoreState.data,
    getSettingsEditProductDataState.data,
    id,
    dispatch,
  ]);

  const handleOnChange = (value: string, property: string) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [property]: value,
    }));
  };
  const handleOnSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const editProductParam: stockOrderSettingsProductParam = {
      productId: formState.productId,
      productName: formState.productName,
      uom: formState.uom,
      categoryType: formState.categoryType?.id,
      cost: formState.cost,
      store_id: formState.stores?.map((store) => store.store_id) || [],
    };

    dispatch(
      stockOrderEditProduct({ id: id ?? "", productData: editProductParam })
    );
  };

  useEffect(() => {
    if (stockOrderEditProductState.success === editProductState.status) {
      navigate("/admin/stock-order/settings/products");
      dispatch(resetGetStockOrderSettingProductsEditStatus());
    }
  }, [editProductState.status, stockOrderEditProductState.success]);

  return (
    <div className="flex flex-col space-y-5">
      <div>
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit product
        </span>
      </div>
      <form onSubmit={handleOnSubmit} className="w-full px-10 space-y-5">
        <MaterialInput
          fullWidth
          required
          name={"productId"}
          label="Product Id"
          colorTheme={"black"}
          placeholder="Product Id"
          value={formState.productId}
          onChange={(event) =>
            handleOnChange(event.target.value, event.target.name)
          }
        />

        <MaterialInput
          fullWidth
          required
          name={"productName"}
          label="Product Name"
          colorTheme={"black"}
          placeholder="Product Name"
          value={formState.productName}
          onChange={(event) =>
            handleOnChange(event.target.value, event.target.name)
          }
        />

        <MaterialInput
          fullWidth
          required
          name={"uom"}
          label="UOM / Unit of Measure"
          colorTheme={"black"}
          placeholder="UOM / Unit of Measure"
          value={formState.uom}
          onChange={(event) =>
            handleOnChange(event.target.value, event.target.name)
          }
        />

        <MaterialInputAutoComplete
          required
          colorTheme={"black"}
          options={categoryType ?? []}
          label="Category Type (Frozen or Dry)"
          getOptionLabel={(option) => option.name ?? ""}
          placeholder="Category Type (Frozen or Dry)"
          value={formState.categoryType}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, selectedValue) => {
            if (selectedValue) {
              handleOnChange(selectedValue, "categoryType");
            }
          }}
        />

        <MaterialInput
          fullWidth
          required
          name={"cost"}
          label="Cost"
          colorTheme={"black"}
          placeholder="Cost"
          value={formState.cost?.toString()}
          onChange={(event) =>
            handleOnChange(event.target.value, event.target.name)
          }
        />

        <MaterialInputAutoComplete
          label="Select Stores"
          placeholder="Select Stores"
          colorTheme="black"
          multiple
          options={getAllStoreState.data?.stores ?? []}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          value={formState.stores ? [...formState.stores] : []}
          onChange={(event, selectedValue) => {
            if (selectedValue) {
              handleOnChange(selectedValue, "stores");
            }
          }}
          filterSelectedOptions
        />

        <Button type="submit" sx={STOCK_ORDERING_BUTTON_STYLE} fullWidth>
          Edit
        </Button>
      </form>
    </div>
  );
}
