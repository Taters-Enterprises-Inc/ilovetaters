import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { MdLockOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useRef } from "react";
import { MobileLoginPhoneInput } from "./mobile-login-phone-input";

export function MobileLoginSignUp() {
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
        <form>
          <p className="text-white">
            Please fill up the required information for each field.
          </p>

          <div className="flex items-center justify-between w-full mt-6">
            <div className="flex items-center justify-center w-[49%] bg-gray-100 rounded-2xl">
              <CgProfile className="m-3" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                autoComplete="off"
                className="w-full text-sm bg-gray-100 outline-none none h-9 rounded-2xl "
              ></input>
            </div>
            <div className="flex items-center justify-center w-[49%] bg-gray-100 rounded-2xl">
              <CgProfile className="m-3" />
              <input
                type="text"
                name="lastName"
                autoComplete="off"
                placeholder="Last Name"
                className="w-full text-sm bg-gray-100 outline-none h-9 rounded-2xl "
              ></input>
            </div>
          </div>

          <MobileLoginPhoneInput />

          <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl">
            <MdLockOutline className="m-3" />
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9 autolog"
            ></input>
          </div>
          <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl">
            <MdLockOutline className="m-3" />
            <input
              type="password"
              name="passw"
              autoComplete="off"
              placeholder="Password"
              className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9 autolog"
            ></input>
          </div>

          <div className="flex justify-between py-4 text-white">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>
            <a href="#"> Forgot Password? </a>
          </div>
          <button className="w-full py-2 my-2 text-white shadow-md bg-button rounded-3xl">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
