import {
  BSCCreateUserPasswordTextField,
  BSCHead,
  BSCPhoneNumber,
} from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { getBscUser, resetBscUser } from "../slices/get-bsc-user.slice";
import {
  getBscGroups,
  selectGetBscGroups,
} from "../slices/get-bsc-groups.slice";
import Checkbox from "@mui/material/Checkbox";
import {
  editBscUser,
  EditBscUserState,
  resetEditBscUser,
  selectEditBscUser,
} from "../slices/bsc-edit-user.slice";
import { IoMdClose } from "react-icons/io";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getBscStores,
  selectGetBscStores,
} from "../slices/get-bsc-stores.slice";
import {
  GetBscUserStoresState,
  selectGetBscUserStores,
  getBscUserStoresUpdateStores,
  getBscUserStores,
} from "../slices/get-bsc-user-stores.slice";
import { selectGetBscUser } from "../slices/get-bsc-user.slice";
import { FormEvent, useEffect } from "react";

export function BSCEditUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getBscStoresState = useAppSelector(selectGetBscStores);
  const getBscUserStoresState = useAppSelector(selectGetBscUserStores);
  const getBscUserStateState = useAppSelector(selectGetBscUser);

  useEffect(() => {
    dispatch(getBscStores());
    if (id) {
      dispatch(getBscUser(id));
      dispatch(getBscUserStores(id));
    }
  }, []);

  console.log(getBscStoresState);
  return (
    <>
      <BSCHead
        BSCBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/bsc",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "User", url: "/bsc/users" },
            { name: "Edit User", url: "/bsc/users/edit-user" },
          ],
        }}
      />

      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit User
        </span>

        <div className="pb-10 space-y-6">
          <span>Please enter the user's information below.</span>

          {getBscStoresState.data ? (
            <form className="p-4 space-y-4 bg-paper">
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
    </>
  );
}
