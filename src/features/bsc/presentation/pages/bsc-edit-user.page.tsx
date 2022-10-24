import {
  BSCCreateUserPasswordTextField,
  BSCHead,
  BSCPhoneNumber,
} from "../components";
import TextField from "@mui/material/TextField";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBscUser,
  resetBscUser,
  selectGetBscUser,
} from "../slices/get-bsc-user.slice";
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

export function BSCEditUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getBscUserState = useAppSelector(selectGetBscUser);
  const getBscGroupsState = useAppSelector(selectGetBscGroups);
  const editBscUserState = useAppSelector(selectEditBscUser);
  console.log(getBscUserState);

  useEffect(() => {
    if (editBscUserState.status === EditBscUserState.success) {
      dispatch(resetEditBscUser());
      navigate("/bsc/users");
    }
  }, [editBscUserState, navigate, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(resetBscUser());
      dispatch(getBscUser(id));
      dispatch(getBscGroups());
    }
  }, [dispatch, id]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      dispatch(
        editBscUser({
          userId: id,
          formData: formData,
        })
      );
    }
  };
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

          {getBscUserState.data && getBscGroupsState.data ? (
            <form onSubmit={onSubmit} className="flex flex-col space-y-4">
              <TextField
                label="First Name"
                name="first_name"
                required
                defaultValue={getBscUserState.data.first_name}
              />
              <TextField
                label="Last Name"
                name="last_name"
                required
                defaultValue={getBscUserState.data.last_name}
              />
              <TextField
                label="Company Name"
                name="company"
                required
                defaultValue={getBscUserState.data.company}
              />
              <BSCPhoneNumber
                label="Phone Number"
                name="phone"
                defaultValue={getBscUserState.data.phone}
              />
              <BSCCreateUserPasswordTextField
                name="password"
                label="Password ( if changing )"
              />
              <BSCCreateUserPasswordTextField
                name="password_confirm"
                label="Confirm Password ( if changing password )"
              />
              <div className="flex flex-wrap">
                {getBscGroupsState.data?.map((group) => (
                  <div className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base">
                    <Checkbox
                      color="primary"
                      name="groups[]"
                      value={group.id}
                      defaultChecked={getBscUserState.data?.groups.some(
                        (element) => {
                          if (element.id === group.id) {
                            return true;
                          }

                          return false;
                        }
                      )}
                    />
                    <span>{group.name}</span>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-lg bg-button w-fit"
              >
                Edit User
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
}
