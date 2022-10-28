import {
  BSCCreateUserPasswordTextField,
  BSCHead,
  BSCPhoneNumber,
} from "../components";
import TextField from "@mui/material/TextField";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  createBscUser,
  CreateBscUserState,
  resetCreateUserBscStatus,
  selectCreateBscUser,
} from "../slices/create-bsc-user.slice";
import { useNavigate } from "react-router-dom";

export function BSCCreateUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createBscUserState = useAppSelector(selectCreateBscUser);

  useEffect(() => {
    if (createBscUserState.status === CreateBscUserState.success) {
      dispatch(resetCreateUserBscStatus());
      navigate("/bsc/users");
    }
  }, [createBscUserState, navigate, dispatch]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // dispatch(createBscUser(formData));
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
            { name: "Create User", url: "/bsc/users/create-user" },
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
            <BSCPhoneNumber label="Phone Number" name="phone" />
            <BSCCreateUserPasswordTextField
              name="password"
              label="Password"
              required
            />
            <BSCCreateUserPasswordTextField
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
