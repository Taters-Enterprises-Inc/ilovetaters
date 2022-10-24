import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FormEvent } from "react";
import { useAppDispatch } from "features/config/hooks";
import { signUpMobileUser } from "../slices/sign-up-mobile-user.slice";
import { PhoneInput } from "./phone-input";
import { useState } from "react";
import { MaterialInput } from ".";

export function MobileLoginSignUp() {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleMobileSignUp = (e: FormEvent<HTMLFormElement>) => {
    dispatch(signUpMobileUser(formState));
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
              <MaterialInput
                colorTheme="white"
                name="firstName"
                label="First Name"
                size="small"
                value={formState.firstName}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <MaterialInput
                colorTheme="white"
                name="lastName"
                label="Last Name"
                size="small"
                value={formState.lastName}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </div>
            <PhoneInput
              required
              colorTheme="white"
              value={formState.phoneNumber}
              name="phoneNumber"
              fullWidth
              label="Phone Number"
              size="small"
              onChange={handleInputChange}
            />

            <MaterialInput
              colorTheme="white"
              name="email"
              label="Email"
              size="small"
              value={formState.email}
              onChange={handleInputChange}
              required
              type="email"
              fullWidth
            />
          </div>

          <button className="w-full py-2 mt-4 mb-2 text-white shadow-md bg-button rounded-3xl">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
