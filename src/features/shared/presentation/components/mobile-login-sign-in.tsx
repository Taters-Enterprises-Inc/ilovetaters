import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import { FormEvent, useEffect, useState } from "react";
import { MaterialPhoneInput } from ".";
import { MobileForgotPasswordModal } from "../modals";
import {
  selectSignInMobileUser,
  signInMobileUser,
  SignInMobileUserState,
} from "../slices/sign-in-mobile-user.slice";
import { MaterialInputPassword } from "./material-input-password";

export function MobileLoginSignIn() {
  const dispatch = useAppDispatch();
  const signInMobileUserState = useAppSelector(selectSignInMobileUser);

  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (signInMobileUserState.status === SignInMobileUserState.success) {
      dispatch(getNotifications());
    }
  }, [signInMobileUserState, dispatch]);

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    dispatch(
      signInMobileUser({
        phoneNumber,
        password,
      })
    );
    e.preventDefault();
  };

  const handleInputChange = (evt: any) => {
    const re = /^[0-9\b]+$/;
    if (evt === "" || re.test(evt)) {
      setPhoneNumber(evt);
    }
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
          <p className="mb-4 text-white">
            Login with your mobile number and password below.{" "}
          </p>

          <div className="space-y-4">
            <MaterialPhoneInput
              required
              colorTheme="white"
              size="small"
              value={phoneNumber}
              name="phoneNumber"
              fullWidth
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <MaterialInputPassword
              required
              colorTheme="white"
              value={password}
              size="small"
              fullWidth
              label="Password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-between py-4 text-white">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>
            <button
              type="button"
              onClick={() => {
                setOpenForgotPassword(true);
              }}
            >
              {" "}
              Forgot Password?{" "}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 my-2 text-white shadow-md bg-button rounded-3xl"
          >
            Sign in
          </button>
        </form>
      </div>

      <MobileForgotPasswordModal
        open={openForgotPassword}
        onClose={() => {
          setOpenForgotPassword(false);
        }}
      />
    </>
  );
}
