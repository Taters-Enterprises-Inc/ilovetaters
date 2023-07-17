import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderProductSelector } from "../components";
import {
  getStockOrderStores,
  selectGetStockOrderStores,
} from "../slices/get-store.slice";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import { confirmNewOrder } from "../slices/confirm-new-order.slice";
import { STOCK_ORDER_CATEGORY } from "features/shared/constants";
import { createQueryParams } from "features/config/helpers";

interface PlaceOrdersModalProps {
  open: boolean;
  onClose: () => void;
  openConfirmationState: (value: boolean) => void;
}

export function PlaceOrderModal(props: PlaceOrdersModalProps) {
  const dispatch = useAppDispatch();

  const getStores = useAppSelector(selectGetStockOrderStores);

  const [selectedStore, setSelectedStore] = useState<
    | {
        store_id: string;
        name: string;
      }
    | undefined
  >();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const [category, setCategory] = useState<{
    category_id: string;
    category_name: string;
  }>();

  const [rows, setRows] = useState<OrderTableData[]>([]);

  useEffect(() => {
    setSelectedStore({ store_id: "", name: "" });
    setCategory({ category_id: "", category_name: "" });
  }, [props.open]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
      confirmNewOrder({
        data: {
          selectedStoreId: selectedStore?.store_id,
          selectedAddress: selectedAddress,
          category: category,
          OrderData: rows,
        },
      })
    );
    props.openConfirmationState(true);
  };

  useEffect(() => {
    const query = createQueryParams({
      store_id: selectedStore?.store_id ?? "",
    });

    dispatch(getStockOrderStores(query));
  }, [dispatch, selectedStore?.store_id]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div
        id="place-order-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Place Order</span>
            <button
              className="text-2xl text-white"
              onClick={() => {
                document.body.classList.remove("overflow-hidden");
                props.onClose();
              }}
            >
              <IoMdClose />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
              <>
                <div className="flex flex-row space-x-5">
                  <div className="basis-1/2	flex flex-col space-y-2">
                    <span>Select Store: </span>
                    <Autocomplete
                      fullWidth
                      size="small"
                      options={
                        getStores.data
                          ? getStores.data.stores.map((row) => row.name)
                          : []
                      }
                      onChange={(event, value: any) => {
                        if (value && getStores.data) {
                          const selectedStoreObj = getStores.data.stores.find(
                            (store) => store.name === value
                          );
                          setSelectedStore(selectedStoreObj);
                          setDisabled(false);
                        } else {
                          setSelectedStore(undefined);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          required
                          value={selectedStore ?? ""}
                          {...params}
                          label="Select store to evaluate"
                        />
                      )}
                    />
                  </div>
                  {/* set to basis 1/2 after enabling again */}
                  <div className="basis-1/2	flex flex-col space-y-2">
                    <span>Ship to address: </span>
                    <Autocomplete
                      fullWidth
                      disabled={selectedStore?.store_id === ""}
                      size="small"
                      options={
                        getStores.data?.ship_to_address.map(
                          (address) => address.ship_to_address
                        ) ?? []
                      }
                      onChange={(event, value: any) => {
                        setSelectedAddress(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          required
                          value={selectedAddress ?? ""}
                          {...params}
                          label="Ship to address"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span>Select product Category: </span>

                  <Autocomplete
                    id="stock-order-category-name"
                    size="small"
                    disabled={
                      selectedStore?.store_id === undefined &&
                      selectedStore?.name === undefined
                    }
                    options={
                      STOCK_ORDER_CATEGORY.map((row) => row.category_name) ?? []
                    }
                    onChange={(event, value) => {
                      STOCK_ORDER_CATEGORY.find((row) => {
                        if (row.category_name === value) {
                          setCategory({
                            category_id: row.category_id ?? "",
                            category_name: row.category_name ?? "",
                          });
                        }
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        value={category?.category_name ?? ""}
                        {...params}
                        label="Select product category"
                      />
                    )}
                  />
                </div>
              </>
              {selectedStore?.name &&
              selectedStore.store_id &&
              category?.category_id ? (
                <div className="border-2 border-secondary rounded-lg max-h-fit p-2">
                  <StockOrderProductSelector
                    category_id={category.category_id}
                    selected_store={selectedStore}
                    setRows={setRows}
                  />
                </div>
              ) : null}
              <div>
                <div className="mt-5">
                  <Button
                    disabled={isDisabled || rows.length === 0}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
