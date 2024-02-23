import {
  MaterialInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import { categoryType } from "./stock-ordering-utils";
import { Button } from "@mui/material";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  selectstockOrderCreateProduct,
  stockOrderCreateProduct,
  stockOrderCreateProductState,
} from "../slices/stock-order-settings-product-create.slice";
import { stockOrderSettingsProductParam } from "features/stock-ordering/core/stock-ordering.params";
import { useNavigate } from "react-router-dom";
import {
  GetStockOrderAllStoresState,
  getStockOrderAllStores,
  selectGetStockOrderAllStores,
} from "../slices/stock-order-get-all-stores.slice";

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

export default function StockOrderSettingsProductCreateContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createProductState = useAppSelector(selectstockOrderCreateProduct);
  const getAllStoreState = useAppSelector(selectGetStockOrderAllStores);
  const [formState, setFormState] = useState<formData>({
    productId: "",
    productName: "",
    uom: "",
    categoryType: null,
    cost: null,
    stores: null,
  });

  useEffect(() => {
    if (
      !getAllStoreState.data &&
      getAllStoreState.status !== GetStockOrderAllStoresState.success
    ) {
      dispatch(getStockOrderAllStores());
    }
  }, [getAllStoreState.data, dispatch]);

  const handleOnChange = (value: string, property: string) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [property]: value,
    }));
  };
  const handleOnSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const createProductParam: stockOrderSettingsProductParam = {
      productId: formState.productId,
      productName: formState.productName,
      uom: formState.uom,
      categoryType: formState.categoryType?.id,
      cost: formState.cost,
      store_id: formState.stores?.map((store) => store.store_id) || [],
    };

    dispatch(stockOrderCreateProduct(createProductParam));
  };

  useEffect(() => {
    if (stockOrderCreateProductState.success === createProductState.status) {
      navigate("/admin/stock-order/settings/products");
    }
  }, [createProductState.status, stockOrderCreateProductState.success]);

  return (
    <div className="flex flex-col space-y-5">
      <div>
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create product
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
          Create
        </Button>
      </form>
    </div>
  );
}
