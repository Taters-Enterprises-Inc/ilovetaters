import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { MdLockOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MobileLoginPhoneInput } from "./mobile-login-phone-input";
import { FormEvent } from "react";
import { useAppDispatch } from "features/config/hooks";
import { signUpMobileUser } from "../slices/sign-up-mobile-user.slice";
import { MobileSignUpFirstName } from "./mobile-signup-firstname";
import { MobileSignUpLastName } from "./mobile-signup-lastname";
import { MobileSignUpEmail } from "./mobile-signup-email";

export function MobileLoginSignUp() {
  const dispatch = useAppDispatch();

  const handleMobileSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    dispatch(signUpMobileUser(formData));
  };

  return (
    <>
      <div className="flex items-center justify-center header_image">
        <img
          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shop/snackshop-logo-creamy-red.png`}
          alt="Taters Logo"
          className="w-36"
        ></img>
      </div>
      <div className="pt-4 login-body">
        <form onSubmit={handleMobileSignUp}>
          <p className="text-white">
            Please fill up the required information for each field.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between w-full mt-6 space-x-4">
              <MobileSignUpFirstName />
              <MobileSignUpLastName />
            </div>
            <MobileLoginPhoneInput />
            <MobileSignUpEmail />
          </div>

          <button className="w-full py-2 mt-4 mb-2 text-white shadow-md bg-button rounded-3xl">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
