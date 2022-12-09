import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { FormEvent, useEffect, useState } from "react";
import {
  MaterialInput,
  MaterialInputAutoComplete,
  MaterialInputPassword,
  MaterialPhoneInput,
} from "features/shared/presentation/components";
import MenuItem from "@mui/material/MenuItem";
import {
  getAllStores,
  GetAllStoresState,
  selectGetAllStores,
} from "features/shared/presentation/slices/get-all-stores.slice";
import {
  getAllCompanies,
  GetAllCompaniesState,
  selectGetAllCompanies,
} from "features/shared/presentation/slices/get-all-companies.slice";
import {
  createBscUser,
  CreateBscUserState,
  resetCreateUserBscStatus,
  selectCreateBscUser,
} from "../slices/create-bsc-user.slice";

export function BscSignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getAllStoresState = useAppSelector(selectGetAllStores);
  const getAllCompaniesState = useAppSelector(selectGetAllCompanies);
  const createBscUserState = useAppSelector(selectCreateBscUser);

  useEffect(() => {
    if (createBscUserState.status === CreateBscUserState.success) {
      navigate("/bsc");
      dispatch(resetCreateUserBscStatus());
    }
  }, [createBscUserState, dispatch, navigate]);

  useEffect(() => {
    dispatch(getAllStores());
    dispatch(getAllCompanies());
  }, [dispatch]);

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

  function handleInputChange(evt: any) {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    dispatch(createBscUser(formState));
    e.preventDefault();
  };

  return (
    <>
      <main className="flex items-center justify-center h-screen bg-paper">
        <div
          className="bg-secondary w-[90%] sm:w-[400px] mx-auto p-6 px-6 
          font-['Varela_Round'] text-sm text-center rounded-3xl shadow-md"
        >
          <div className="pt-1 login-body">
            <form onSubmit={handleOnSubmit}>
              <p className="mb-3 text-2xl font-bold text-left text-white">
                Create an Account
              </p>
              <p className="text-xs text-left text-white">
                {" "}
                Enter the following information to register.{" "}
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex space-x-2">
                  <MaterialInput
                    colorTheme="white"
                    required
                    name="firstName"
                    label="First Name"
                    size="small"
                    value={formState.firstName}
                    onChange={handleInputChange}
                  />
                  <MaterialInput
                    colorTheme="white"
                    required
                    name="lastName"
                    label="Last Name"
                    size="small"
                    value={formState.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                <MaterialInput
                  colorTheme="white"
                  required
                  name="designation"
                  label="Designation"
                  size="small"
                  value={formState.designation}
                  onChange={handleInputChange}
                  fullWidth
                />

                {getAllCompaniesState.status === GetAllCompaniesState.success &&
                getAllCompaniesState.data ? (
                  <MaterialInputAutoComplete
                    label="Select store"
                    colorTheme="white"
                    size="small"
                    fullWidth
                    required
                    options={getAllCompaniesState.data}
                    defaultValue={getAllCompaniesState.data[0]}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      if (value) {
                        setFormState({
                          ...formState,
                          company: value.id,
                        });
                      }
                    }}
                  />
                ) : null}

                {getAllStoresState.status === GetAllStoresState.success &&
                getAllStoresState.data ? (
                  <MaterialInputAutoComplete
                    label="Select store"
                    colorTheme="white"
                    size="small"
                    fullWidth
                    required
                    options={getAllStoresState.data}
                    defaultValue={getAllStoresState.data[0]}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      if (value) {
                        setFormState({
                          ...formState,
                          store: value.store_id,
                        });
                      }
                    }}
                  />
                ) : null}

                <MaterialInput
                  colorTheme="white"
                  required
                  name="email"
                  label="E-mail"
                  size="small"
                  value={formState.email}
                  onChange={handleInputChange}
                  fullWidth
                />

                <MaterialPhoneInput
                  colorTheme="white"
                  required
                  name="phoneNumber"
                  label="Phone Number"
                  size="small"
                  value={formState.phoneNumber}
                  onChange={handleInputChange}
                  fullWidth
                />

                <MaterialInputPassword
                  colorTheme="white"
                  required
                  name="password"
                  label="Password"
                  size="small"
                  value={formState.password}
                  onChange={handleInputChange}
                  fullWidth
                />

                <MaterialInputPassword
                  colorTheme="white"
                  required
                  name="confirmPassword"
                  label="Confirm Password"
                  size="small"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
              <div className="flex justify-between mt-6 mb-2 text-white text-[12px]">
                <p className="mx-auto">
                  <input className="mr-2" type="checkbox" />I agree to the{" "}
                  <Link
                    className="cursor-pointer hover:underline"
                    to={"/bsc/terms-and-condition"}
                  >
                    Terms of Service and Privacy Policy
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-2 my-3 text-white bg-button rounded-3xl"
              >
                CREATE ACCOUNT
              </button>
              <p className="my-1 text-xs text-center text-white">
                {" "}
                Already have an account?{" "}
                <span className="cursor-pointer text-button hover:underline">
                  {" "}
                  Log in here.{" "}
                </span>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
