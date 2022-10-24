import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { MdLockOutline } from "react-icons/md";
import {
  changeForgotPasswordStatus,
  ChangeForgotPasswordStatusState,
  selectChangeForgotPasswordStatus,
} from "../slices/change-forgot-password-status.slice";
import { FormEvent, useEffect, useState } from "react";
import {
  forgotPasswordNewPassword,
  ForgotPasswordNewPasswordState,
  resetForgotPasswordNewPassword,
  selectForgotPasswordNewPassword,
} from "../slices/forgot-password-new-password-otp.slice";
import { MaterialInputPassword } from "./material-input-password";

export function MobileForgotPasswordNewPassword() {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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
    if (changeForgotPasswordStatusState.phoneNumber) {
      dispatch(
        forgotPasswordNewPassword({
          phoneNumber: changeForgotPasswordStatusState.phoneNumber,
          password,
          confirmPassword,
        })
      );
    }
    e.preventDefault();
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

          <div className="pt-4 space-y-4">
            <MaterialInputPassword
              required
              colorTheme="white"
              label="Password"
              value={password}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth
              size="small"
            />
            <MaterialInputPassword
              colorTheme="white"
              required
              label="Confirm Password"
              value={confirmPassword}
              name="confirmPassword"
              fullWidth
              size="small"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
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
