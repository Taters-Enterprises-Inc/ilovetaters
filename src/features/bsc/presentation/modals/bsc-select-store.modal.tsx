import { IoMdClose } from "react-icons/io";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { selectGetBscStores } from "../slices/get-bsc-stores.slice";
import {
  GetBscUserStoresState,
  selectGetBscUserStores,
  getBscUserStoresUpdateStores,
} from "../slices/get-bsc-user-stores.slice";
import { selectGetBscUser } from "../slices/get-bsc-user.slice";
import { FormEvent, useEffect } from "react";
import {
  resetUpdateBscUserStoresStatus,
  selectUpdateBscUserStores,
  updateBscUserStores,
  UpdateBscUserStoresState,
} from "../slices/bsc-update-user-stores.slice";
interface BscShopOrdersModalProps {
  open: boolean;
  onClose: () => void;
}

export function BscSelectStoreModal(props: BscShopOrdersModalProps) {
  const getBscStoresState = useAppSelector(selectGetBscStores);
  const getBscUserStoresState = useAppSelector(selectGetBscUserStores);
  const getBscUserStateState = useAppSelector(selectGetBscUser);
  const updateBscUserStoresState = useAppSelector(selectUpdateBscUserStores);

  const dispatch = useAppDispatch();
  const query = useQuery();
  const userId = query.get("user_id");

  useEffect(() => {
    if (updateBscUserStoresState.status === UpdateBscUserStoresState.success) {
      props.onClose();
      dispatch(resetUpdateBscUserStoresStatus());
    }
  }, [updateBscUserStoresState, props]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  const handleUpdateStore = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      getBscUserStoresState.status === GetBscUserStoresState.success &&
      getBscUserStoresState.data &&
      userId
    ) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      formData.append("user_id", userId);
      formData.append("stores", JSON.stringify(getBscUserStoresState.data));
      dispatch(updateBscUserStores(formData));
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Select Store</span>
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
        {getBscStoresState.data ? (
          <form onSubmit={handleUpdateStore} className="p-4 space-y-4 bg-paper">
            <span className="text-xl text-secondary">
              Account Name: {getBscUserStateState.data?.first_name}{" "}
              {getBscUserStateState.data?.last_name}
            </span>

            <Autocomplete
              multiple
              options={getBscStoresState.data}
              getOptionLabel={(option) => option.name}
              value={
                getBscUserStoresState.data
                  ? [...getBscUserStoresState.data]
                  : []
              }
              onChange={(e, stores) => {
                dispatch(getBscUserStoresUpdateStores({ stores }));
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Store"
                  placeholder="Stores"
                />
              )}
            />

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-lg bg-button w-fit"
              >
                Update Store
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
}
