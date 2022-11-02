import { BSCHead } from "../components";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  createBscUser,
  CreateBscUserState,
  resetCreateUserBscStatus,
  selectCreateBscUser,
} from "../slices/create-bsc-user.slice";

import { useNavigate } from "react-router-dom";
import {
  MaterialInput,
  MaterialInputPassword,
  MaterialPhoneInput,
} from "features/shared/presentation/components";
import {
  getAllStores,
  selectGetAllStores,
} from "features/shared/presentation/slices/get-all-stores.slice";
import {
  getAllCompanies,
  selectGetAllCompanies,
} from "features/shared/presentation/slices/get-all-companies.slice";
import MenuItem from "@mui/material/MenuItem";
export function BSCCreateUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    company: "",
    store: "none",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const createBscUserState = useAppSelector(selectCreateBscUser);
  const getAllStoresState = useAppSelector(selectGetAllStores);
  const getAllCompaniesState = useAppSelector(selectGetAllCompanies);

  useEffect(() => {
    dispatch(getAllStores());
    dispatch(getAllCompanies());
  }, []);

  useEffect(() => {
    if (createBscUserState.status === CreateBscUserState.success) {
      dispatch(resetCreateUserBscStatus());
      navigate("/bsc/users");
    }
  }, [createBscUserState, navigate, dispatch]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    dispatch(createBscUser(formState));
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

          <form onSubmit={handleOnSubmit} className="flex flex-col space-y-4">
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
              name="designation"
              label="Designation"
              value={formState.designation}
              onChange={handleInputChange}
              fullWidth
            />
            <MaterialInput
              colorTheme="black"
              fullWidth
              select
              required
              onChange={handleInputChange}
              value={formState.company}
              name="company"
              label="Company"
            >
              {getAllCompaniesState.data?.map((company) => (
                <MenuItem value={company.id}>{company.name}</MenuItem>
              ))}
            </MaterialInput>
            <MaterialInput
              colorTheme="black"
              fullWidth
              required
              select
              onChange={handleInputChange}
              value={formState.store}
              name="store"
              label="Store"
            >
              <MenuItem value="none">None</MenuItem>
              {getAllStoresState.data?.map((store) => (
                <MenuItem value={store.store_id}>{store.name}</MenuItem>
              ))}
            </MaterialInput>
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
