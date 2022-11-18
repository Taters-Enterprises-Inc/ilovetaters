import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { MdLockOutline } from "react-icons/md";
import { FormEvent, useState } from "react";
import { signInMobileUser } from "../slices/sign-in-mobile-user.slice";
import { useAppDispatch } from "features/config/hooks";
import { MobileLoginPhoneInput } from "./mobile-login-phone-input";
import { MobileForgotPasswordModal } from "../modals";
import { MobilePasswordTextField } from "./mobile-password-textfield";
import { getUnreadNotifications } from "../slices/unread-notification.slice";

export function MobileLoginSignIn() {
  const dispatch = useAppDispatch();

  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    dispatch(signInMobileUser(formData));
    dispatch(getUnreadNotifications());
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
            <MobileLoginPhoneInput />
            <MobilePasswordTextField />
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
