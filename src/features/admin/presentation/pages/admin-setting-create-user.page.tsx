import {
  AdminCreateUserPasswordTextField,
  AdminHead,
  AdminPhoneInput,
} from "../components";
import TextField from "@mui/material/TextField";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  createAdminUser,
  CreateAdminUserState,
  resetCreateAdminUser,
  selectCreateAdminUser,
} from "../slices/create-admin-user.slice";
import { useNavigate } from "react-router-dom";

export function AdminSettingCreateUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createAdminUserState = useAppSelector(selectCreateAdminUser);

  useEffect(() => {
    if (createAdminUserState.status === CreateAdminUserState.success) {
      dispatch(resetCreateAdminUser());
      navigate("/admin/setting/user");
    }
  }, [createAdminUserState, navigate, dispatch]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    dispatch(createAdminUser(formData));
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
            { name: "Create User", url: "/admin/setting/user/create-user" },
          ],
        }}
      />

      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create User
        </span>

        <div className="pb-10 space-y-6">
          <span>Please enter the user's information below.</span>

          <form onSubmit={onSubmit} className="flex flex-col space-y-4">
            <TextField label="First Name" name="first_name" required />
            <TextField label="Last Name" name="last_name" required />
            <TextField label="Company Name" name="company" required />
            <TextField label="Email" name="email" required />
            <AdminPhoneInput label="Phone Number" name="phone" />
            <AdminCreateUserPasswordTextField
              name="password"
              label="Password"
              required
            />
            <AdminCreateUserPasswordTextField
              name="password_confirm"
              label="Confirm Password"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-button w-fit"
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
