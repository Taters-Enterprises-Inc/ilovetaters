import { IoMdClose } from "react-icons/io";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { selectGetAdminSettingUserStores } from "../slices/get-admin-setting-user-stores.slice";
import {
  GetAdminSettingUserStoreState,
  selectGetAdminSettingUserStore,
  getAdminSettingUserStoreUpdateStore,
} from "../slices/get-admin-setting-user-store.slice";
import { selectGetAdminUser } from "../slices/get-admin-user.slice";
import { FormEvent, useEffect } from "react";
import {
  resetUpdateAdminSettingUserStoresStatus,
  selectUpdateAdminSettingUserStores,
  updateAdminSettingUserStores,
  UpdateAdminSettingUserStoresState,
} from "../slices/update-admin-setting-user-stores.slice";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";
interface AdminShopOrdersModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSelectStoreModal(props: AdminShopOrdersModalProps) {
  const getAdminSettingUserStoresState = useAppSelector(
    selectGetAdminSettingUserStores
  );
  const getAdminSettingUserStoreState = useAppSelector(
    selectGetAdminSettingUserStore
  );
  const getAdminUserStateState = useAppSelector(selectGetAdminUser);
  const updateAdminSettingUserStoresState = useAppSelector(
    selectUpdateAdminSettingUserStores
  );

  const dispatch = useAppDispatch();
  const query = useQuery();
  const userId = query.get("user_id");

  useEffect(() => {
    if (
      updateAdminSettingUserStoresState.status ===
      UpdateAdminSettingUserStoresState.success
    ) {
      props.onClose();
      dispatch(resetUpdateAdminSettingUserStoresStatus());
    }
  }, [updateAdminSettingUserStoresState, props, dispatch]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  const handleUpdateStore = (e: FormEvent<HTMLFormElement>) => {
    if (
      getAdminSettingUserStoreState.status ===
        GetAdminSettingUserStoreState.success &&
      getAdminSettingUserStoreState.data &&
      userId
    ) {
      dispatch(
        updateAdminSettingUserStores({
          userId,
          stores: getAdminSettingUserStoreState.data,
        })
      );
    }
    e.preventDefault();
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
        {getAdminSettingUserStoresState.data ? (
          <form onSubmit={handleUpdateStore} className="p-4 space-y-4 bg-paper">
            <span className="text-xl text-secondary">
              Account Name: {getAdminUserStateState.data?.first_name}{" "}
              {getAdminUserStateState.data?.last_name}
            </span>

            <MaterialInputAutoComplete
              label="Select Stores"
              colorTheme="black"
              multiple
              options={getAdminSettingUserStoresState.data}
              getOptionLabel={(option) => option.name}
              value={
                getAdminSettingUserStoreState.data
                  ? [...getAdminSettingUserStoreState.data]
                  : []
              }
              onChange={(e, stores) => {
                dispatch(getAdminSettingUserStoreUpdateStore({ stores }));
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
