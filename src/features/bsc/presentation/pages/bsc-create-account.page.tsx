import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BSCPasswordTextField } from "../components/bsc-password-text-field";
import { BSCEmailTextField } from "../components/bsc-email-text-field";
import { BSCFirstNameTextField } from "../components/bsc-first-name-text-field";
import { BSCLastNameTextField } from "../components/bsc-last-name-text-field";
import { BSCDesignationField } from "../components/bsc-designation-field";

import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import BSCStoreSelect from "../components/bsc-store-select";
import BSCCompanySelect from "../components/bsc-company-select";
import { BSCContactField } from "../components/bsc-contact-text-field";

export function BSCCreateAccount() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const navigatetoLogin = () => {
    navigate("/bsc");
  };

  return (
    <main className="flex items-center justify-center h-screen bg-paper">
      <div
        className="bg-secondary w-[90%] sm:w-[400px] mx-auto p-6 px-6 
          font-['Varela_Round'] text-sm text-center rounded-3xl shadow-md"
      >
        <div className="pt-1 login-body">
          <form>
            <p className="mb-3 text-2xl font-bold text-left text-white">
              Create an Account
            </p>
            <p className="text-xs text-left text-white">
              {" "}
              Enter the following information to register.{" "}
            </p>
            <div className="pt-4 space-y-4">
              <div className="flex space-x-2">
                <BSCFirstNameTextField />
                <BSCLastNameTextField />
              </div>
              <BSCDesignationField />
              <BSCCompanySelect />
              <BSCStoreSelect />
              <BSCEmailTextField />
              <BSCContactField />
              <BSCPasswordTextField />
            </div>

            <div className="flex justify-between mt-6 mb-2 text-white text-[12px]">
              <p className="mx-auto">
                <input className="mr-2" type="checkbox" /> I agree to the Terms
                of Service and Privacy Policy.
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
              <span
                onClick={navigatetoLogin}
                className="cursor-pointer text-button hover:underline"
              >
                {" "}
                Log in here.{" "}
              </span>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
