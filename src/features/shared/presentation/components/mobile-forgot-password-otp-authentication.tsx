import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FormEvent, useEffect, useState } from "react";
import { MdLockOutline } from "react-icons/md";
import {
  changeForgotPasswordStatus,
  ChangeForgotPasswordStatusState,
  selectChangeForgotPasswordStatus,
} from "../slices/change-forgot-password-status.slice";
import {
  forgotPasswordValidateOTP,
  ForgotPasswordValidateOTPState,
  resetForgotPasswordValidateOTP,
  selectForgotPasswordValidateOTP,
} from "../slices/forgot-password-validate-otp.slice";
import { MaterialInput } from "./material-input";

export function MobileForgotPasswordOtpAuthentication() {
  const dispatch = useAppDispatch();

  const [otpCode, setOtpCode] = useState<string>("");

  const changeForgotPasswordStatusState = useAppSelector(
    selectChangeForgotPasswordStatus
  );
  const forgotPasswordValidateOTPState = useAppSelector(
    selectForgotPasswordValidateOTP
  );

  useEffect(() => {
    if (
      forgotPasswordValidateOTPState.status ===
      ForgotPasswordValidateOTPState.success
    ) {
      dispatch(
        changeForgotPasswordStatus({
          status: ChangeForgotPasswordStatusState.newPassword,
        })
      );

      dispatch(resetForgotPasswordValidateOTP());
    }
  }, [forgotPasswordValidateOTPState, dispatch]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (changeForgotPasswordStatusState.phoneNumber) {
      dispatch(
        forgotPasswordValidateOTP({
          phoneNumber: changeForgotPasswordStatusState.phoneNumber,
          otpCode,
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
          <h1 className="mb-2 text-xl font-bold text-white">
            OTP authentication
          </h1>
          <p className="text-white">
            Note: The OTP will expire after 15 minutes
          </p>
          <div className="mt-4">
            <MaterialInput
              colorTheme="white"
              value={otpCode}
              onChange={(e) => {
                setOtpCode(e.target.value);
              }}
              name="otpCode"
              label="Otp Code"
              size="small"
              type="text"
              required
              fullWidth
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
