import {
  AdminCreateUserPasswordTextField,
  AdminHead,
  AdminPhoneInput,
} from "../components";
import TextField from "@mui/material/TextField";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAdminUser,
  resetAdminUser,
  selectGetAdminUser,
} from "../slices/get-admin-user.slice";
import {
  getAdminGroups,
  selectGetAdminGroups,
} from "../slices/get-admin-groups.slice";
import Checkbox from "@mui/material/Checkbox";
import {
  editAdminUser,
  EditAdminUserState,
  resetEditAdminUser,
  selectEditAdminUser,
} from "../slices/edit-admin-user.slice";

export function AdminSettingEditUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const getAdminUserState = useAppSelector(selectGetAdminUser);
  const getAdminGroupsState = useAppSelector(selectGetAdminGroups);
  const editAdminUserState = useAppSelector(selectEditAdminUser);
  console.log(getAdminUserState);

  useEffect(() => {
    if (editAdminUserState.status === EditAdminUserState.success) {
      dispatch(resetEditAdminUser());
      navigate("/admin/setting/user");
    }
  }, [editAdminUserState, navigate, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(resetAdminUser());
      dispatch(getAdminUser(id));
      dispatch(getAdminGroups());
    }
  }, [dispatch, id]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      dispatch(
        editAdminUser({
          userId: id,
          formData: formData,
        })
      );
    }
  };
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "User", url: "/admin/setting/user" },
            { name: "Edit User", url: location.pathname },
          ],
        }}
      />

      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit User
        </span>

        <div className="pb-10 space-y-6">
          <span>Please enter the user's information below.</span>

          {getAdminUserState.data && getAdminGroupsState.data ? (
            <form onSubmit={onSubmit} className="flex flex-col space-y-4">
              <TextField
                label="First Name"
                name="first_name"
                required
                defaultValue={getAdminUserState.data.first_name}
              />
              <TextField
                label="Last Name"
                name="last_name"
                required
                defaultValue={getAdminUserState.data.last_name}
              />
              <TextField
                label="Company Name"
                name="company"
                required
                defaultValue={getAdminUserState.data.company}
              />
              <AdminPhoneInput
                label="Phone Number"
                name="phone"
                defaultValue={getAdminUserState.data.phone}
              />
              <AdminCreateUserPasswordTextField
                name="password"
                label="Password ( if changing )"
              />
              <AdminCreateUserPasswordTextField
                name="password_confirm"
                label="Confirm Password ( if changing password )"
              />
              <div className="flex flex-wrap">
                {getAdminGroupsState.data?.map((group) => (
                  <div className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base">
                    <Checkbox
                      color="primary"
                      name="groups[]"
                      value={group.id}
                      defaultChecked={getAdminUserState.data?.groups.some(
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
