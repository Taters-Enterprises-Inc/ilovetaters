import { AdminHead } from "../components";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  createAdminUser,
  CreateAdminUserState,
  resetCreateAdminUser,
  selectCreateAdminUser,
} from "../slices/create-admin-user.slice";
import { useNavigate } from "react-router-dom";
import {
  MaterialInput,
  MaterialInputPassword,
  MaterialPhoneInput,
} from "features/shared/presentation/components";

export function AdminSettingCreateUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const createAdminUserState = useAppSelector(selectCreateAdminUser);

  useEffect(() => {
    if (createAdminUserState.status === CreateAdminUserState.success) {
      dispatch(resetCreateAdminUser());
      navigate("/admin/setting/user");
    }
  }, [createAdminUserState, navigate, dispatch]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    dispatch(createAdminUser(formState));
    e.preventDefault();
  };

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
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
            <MaterialInput
              colorTheme="black"
              required
              label="First Name"
              name="firstName"
              value={formState.firstName}
              onChange={handleInputChange}
            />
            <MaterialInput
              colorTheme="black"
              required
              label="Last Name"
              name="lastName"
              value={formState.lastName}
              onChange={handleInputChange}
            />
            <MaterialInput
              colorTheme="black"
              required
              label="Company Name"
              name="company"
              value={formState.company}
              onChange={handleInputChange}
            />
            <MaterialInput
              colorTheme="black"
              required
              label="E-mail"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
            />
            <MaterialPhoneInput
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.phoneNumber}
              name="phoneNumber"
            />

            <MaterialInputPassword
              colorTheme="black"
              required
              onChange={handleInputChange}
              value={formState.password}
              name="password"
              label="Password"
            />
            <MaterialInputPassword
              colorTheme="black"
              required
              onChange={handleInputChange}
              value={formState.confirmPassword}
              name="confirmPassword"
              label="Confirm Password"
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
