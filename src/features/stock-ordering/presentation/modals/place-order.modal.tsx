import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Skeleton,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderProductSelector } from "../components";
import {
  GetStockOrderStoresState,
  getStockOrderStores,
  selectGetStockOrderStores,
} from "../slices/get-store.slice";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import { confirmNewOrder } from "../slices/confirm-new-order.slice";
import { STOCK_ORDER_CATEGORY } from "features/shared/constants";
import { createQueryParams } from "features/config/helpers";
import { DeliverySchedule } from "features/stock-ordering/core/domain/delivery-schedule.model";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";

interface PlaceOrdersModalProps {
  open: boolean;
  onClose: () => void;
  openConfirmationState: (value: boolean) => void;
}

interface selectedStore {
  store_id: string;
  name: string;
}

interface category {
  category_id: string;
  category_name: string;
}

export function PlaceOrderModal(props: PlaceOrdersModalProps) {
  const dispatch = useAppDispatch();

  const getStores = useAppSelector(selectGetStockOrderStores);

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isDisabled, setDisabled] = useState(true);
  const [selectedStore, setSelectedStore] = useState<selectedStore>();

  const [category, setCategory] = useState<category>();

  const [rows, setRows] = useState<OrderTableData[]>([]);
  const [schedule, setDeliverySchedule] = useState<DeliverySchedule>();

  useEffect(() => {
    setSelectedStore({ store_id: "", name: "" });
    setCategory({ category_id: "", category_name: "" });
    setSelectedAddress("");
    setDisabled(true);
    setDeliverySchedule({
      cutoff: "",
      is_mwf: false,
      is_tths: false,
      leadtime: "",
    });
  }, [props.open]);

  useEffect(() => {
    const query = createQueryParams({
      store_id: selectedStore?.store_id ?? "",
    });

    dispatch(getStockOrderStores(query));
  }, [dispatch, selectedStore]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
      confirmNewOrder({
        data: {
          selectedStoreId: selectedStore?.store_id,
          selectedAddress: selectedAddress as string,
          category: category,
          OrderData: rows,
          deliveryScheduleData: schedule as DeliverySchedule,
        },
      })
    );
    props.openConfirmationState(true);
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  console.log(selectedAddress);

  return (
    <>
      <div
        id="place-order-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] h-24 lg:w-[900px] my-5 rounded-[10px]">
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
              {getStores.data &&
              GetStockOrderStoresState.success === getStores.status ? (
                <>
                  <div className="flex flex-col md:flex-row md:space-x-5">
                    <div className="md:basis-1/2	flex flex-col space-y-2">
                      <span>Select Store: </span>
                      <MaterialInputAutoComplete
                        colorTheme={"black"}
                        required={true}
                        fullWidth={true}
                        size={"small"}
                        options={getStores.data.stores}
                        getOptionLabel={(option) => option.name || ""}
                        value={selectedStore}
                        label={"Select store to evaluate"}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        onChange={(event, value) => {
                          setSelectedStore(value);
                          setSelectedAddress("");
                          setCategory({
                            category_id: "",
                            category_name: "",
                          });
                          setDisabled(false);
                        }}
                      />
                    </div>

                    <div className="md:basis-1/2	flex flex-col space-y-2">
                      <span>Ship to address: </span>

                      <MaterialInputAutoComplete
                        colorTheme={"black"}
                        disabled={isDisabled}
                        required={true}
                        fullWidth={true}
                        size={"small"}
                        options={getStores.data.address}
                        getOptionLabel={(option) =>
                          option.ship_to_address || ""
                        }
                        value={selectedAddress}
                        label={"Ship to"}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.ship_to_address
                        }
                        onChange={(event, value) => {
                          setSelectedAddress(value);
                        }}
                      />
                    </div>
                  </div>

                  {STOCK_ORDER_CATEGORY && (
                    <div className="flex flex-col space-y-2">
                      <span>Select product Category: </span>

                      <MaterialInputAutoComplete
                        colorTheme={"black"}
                        disabled={isDisabled}
                        required={true}
                        fullWidth={true}
                        size={"small"}
                        options={STOCK_ORDER_CATEGORY}
                        getOptionLabel={(option) => option.category_name || ""}
                        value={category}
                        label={"Category"}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        onChange={(event, value) => {
                          setCategory(value);
                        }}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col">
                  <div className="flex space-x-5">
                    <Skeleton sx={{ flexBasis: "50%" }} animation="wave" />
                    <Skeleton sx={{ flexBasis: "50%" }} animation="wave" />
                  </div>
                  <Skeleton animation="wave" />
                </div>
              )}

              {selectedStore?.name &&
                selectedStore.store_id &&
                category?.category_id && (
                  <div className="border-2 border-secondary overflow-auto rounded-lg max-h-fit p-2">
                    <StockOrderProductSelector
                      category_id={category.category_id}
                      selected_store={selectedStore}
                      setRows={setRows}
                      setDeliverySchedule={setDeliverySchedule}
                    />
                  </div>
                )}

              <div className="mt-5">
                <Button
                  disabled={isDisabled || rows.length === 0}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ color: "white", backgroundColor: "#CC5801" }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
