import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { MdLockOutline } from "react-icons/md";
import {
  changeForgotPasswordStatus,
  ChangeForgotPasswordStatusState,
  selectChangeForgotPasswordStatus,
} from "../slices/change-forgot-password-status.slice";
import { FormEvent, useEffect } from "react";
import {
  forgotPasswordNewPassword,
  ForgotPasswordNewPasswordState,
  resetForgotPasswordNewPassword,
  selectForgotPasswordNewPassword,
} from "../slices/forgot-password-new-password-otp.slice";

export function MobileForgotPasswordNewPassword() {
  const dispatch = useAppDispatch();
  const changeForgotPasswordStatusState = useAppSelector(
    selectChangeForgotPasswordStatus
  );
  const forgotPasswordNewPasswordState = useAppSelector(
    selectForgotPasswordNewPassword
  );

  useEffect(() => {
    if (
      forgotPasswordNewPasswordState.status ===
      ForgotPasswordNewPasswordState.success
    ) {
      dispatch(
        changeForgotPasswordStatus({
          status: ChangeForgotPasswordStatusState.finish,
        })
      );

      dispatch(resetForgotPasswordNewPassword());
    }
  }, [forgotPasswordNewPasswordState, dispatch]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    dispatch(forgotPasswordNewPassword(formData));
  };

  return (
    <>
      <div className="flex items-center justify-center header_image">
        <img
          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shop/snackshop-logo-creamy-red.png`}
          alt="Taters Logo"
          className="w-36"
        />
      </div>

      <div className="pt-4 login-body">
        <form onSubmit={handleOnSubmit}>
          <h1 className="mb-2 text-xl font-bold text-white ">
            Forgot Password
          </h1>
          <p className="text-white ">Enter your new password</p>

          <input
            name="phoneNumber"
            value={changeForgotPasswordStatusState.phoneNumber}
            className="hidden"
            readOnly
          />

          <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl">
            <MdLockOutline className="m-3" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              required
              className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9 autolog"
            ></input>
          </div>

          <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl">
            <MdLockOutline className="m-3" />
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              required
              className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9 autolog"
            ></input>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-3 mb-2 text-white shadow-md bg-button rounded-3xl"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
