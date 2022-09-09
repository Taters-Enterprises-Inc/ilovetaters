import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { MdLockOutline } from "react-icons/md";
import { FormEvent, useEffect, useState } from "react";
import { AiFillPhone } from "react-icons/ai";
import {
  resetSignInMobileUser,
  selectSignInMobileUser,
  signInMobileUser,
  SignInMobileUserState,
} from "../slices/sign-in-mobile-user.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";

export function MobileLoginSignIn() {
  const dispatch = useAppDispatch();

  const [mobileNumber, setMobileNumber] = useState();
  const [password, setPassword] = useState();

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mobileNumber && password)
      dispatch(
        signInMobileUser({ mobile_num: mobileNumber, login_password: password })
      );
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
        <form onSubmit={handleSignIn}>
          <p className="text-white">
            Login with your mobile number and password below.{" "}
          </p>
          <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl">
            <AiFillPhone className="m-3" />
            <input
              type="text"
              name="mobile_num"
              placeholder="Phone"
              required
              value={mobileNumber}
              onChange={(e: any) => {
                setMobileNumber(e.target.value);
              }}
              className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9 autolog"
            ></input>
          </div>
          <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl">
            <MdLockOutline className="m-3" />
            <input
              type="password"
              name="login_password"
              placeholder="Password"
              required
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
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
          <button
            type="submit"
            className="w-full py-2 my-2 text-white shadow-md bg-button rounded-3xl"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
