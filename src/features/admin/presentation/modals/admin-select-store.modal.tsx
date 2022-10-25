import { IoMdClose } from "react-icons/io";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { selectGetAdminStores } from "../slices/get-admin-stores.slice";
import {
  GetAdminUserStoresState,
  selectGetAdminUserStores,
  getAdminUserStoresUpdateStores,
} from "../slices/get-admin-user-stores.slice";
import { selectGetAdminUser } from "../slices/get-admin-user.slice";
import { FormEvent, useEffect } from "react";
import {
  resetUpdateAdminUserStoresStatus,
  selectUpdateAdminUserStores,
  updateAdminUserStores,
  UpdateAdminUserStoresState,
} from "../slices/update-user-stores.slice";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";
interface AdminShopOrdersModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSelectStoreModal(props: AdminShopOrdersModalProps) {
  const getAdminStoresState = useAppSelector(selectGetAdminStores);
  const getAdminUserStoresState = useAppSelector(selectGetAdminUserStores);
  const getAdminUserStateState = useAppSelector(selectGetAdminUser);
  const updateAdminUserStoresState = useAppSelector(
    selectUpdateAdminUserStores
  );

  const dispatch = useAppDispatch();
  const query = useQuery();
  const userId = query.get("user_id");

  useEffect(() => {
    if (
      updateAdminUserStoresState.status === UpdateAdminUserStoresState.success
    ) {
      props.onClose();
      dispatch(resetUpdateAdminUserStoresStatus());
    }
  }, [updateAdminUserStoresState, props]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  const handleUpdateStore = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      getAdminUserStoresState.status === GetAdminUserStoresState.success &&
      getAdminUserStoresState.data &&
      userId
    ) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      formData.append("user_id", userId);
      formData.append("stores", JSON.stringify(getAdminUserStoresState.data));
      dispatch(updateAdminUserStores(formData));
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
        {getAdminStoresState.data ? (
          <form onSubmit={handleUpdateStore} className="p-4 space-y-4 bg-paper">
            <span className="text-xl text-secondary">
              Account Name: {getAdminUserStateState.data?.first_name}{" "}
              {getAdminUserStateState.data?.last_name}
            </span>

            <MaterialInputAutoComplete
              label="Select Stores"
              colorTheme="black"
              multiple
              options={getAdminStoresState.data}
              getOptionLabel={(option) => option.name}
              value={
                getAdminUserStoresState.data
                  ? [...getAdminUserStoresState.data]
                  : []
              }
              onChange={(e, stores) => {
                dispatch(getAdminUserStoresUpdateStores({ stores }));
              }}
              filterSelectedOptions
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
