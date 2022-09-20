import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FormEvent, useEffect } from "react";
import { MdLockOutline } from "react-icons/md";
import {
  changeForgotPasswordStatus,
  ChangeForgotPasswordStatusState,
  selectChangeForgotPasswordStatus,
} from "../slices/change-forgot-password-status.slice";
import {
  forgotPasswordResendOTP,
  ForgotPasswordResendOTPState,
  resetForgotPasswordResendOTP,
  selectForgotPasswordResendOTP,
} from "../slices/forgot-password-resend-otp.slice";
import {
  forgotPasswordValidateOTP,
  ForgotPasswordValidateOTPState,
  resetForgotPasswordValidateOTP,
  selectForgotPasswordValidateOTP,
} from "../slices/forgot-password-validate-otp.slice";

interface MobileForgotPasswordOtpAuthentication {
  phoneNumber: any;
}

export function MobileForgotPasswordOtpAuthentication(
  props: MobileForgotPasswordOtpAuthentication
) {
  const dispatch = useAppDispatch();
  const changeForgotPasswordStatusState = useAppSelector(
    selectChangeForgotPasswordStatus
  );
  const forgotPasswordValidateOTPState = useAppSelector(
    selectForgotPasswordValidateOTP
  );

  const forgotPasswordResendOTPState = useAppSelector(
    selectForgotPasswordResendOTP
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

  useEffect(() => {
    if (
      forgotPasswordResendOTPState.status ===
      ForgotPasswordResendOTPState.success
    ) {
      dispatch(
        changeForgotPasswordStatus({
          status: ChangeForgotPasswordStatusState.sendOtp,
        })
      );

      dispatch(resetForgotPasswordResendOTP());
    }
  }, [forgotPasswordResendOTPState, dispatch]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    dispatch(forgotPasswordValidateOTP(formData));
  };

  const handleOnResend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPasswordResendOTP(props.phoneNumber));
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

          <input
            name="phoneNumber"
            value={changeForgotPasswordStatusState.phoneNumber}
            className="hidden"
            readOnly
          />

          <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl">
            <MdLockOutline className="m-3" />
            <input
              type="text"
              name="otpCode"
              placeholder="Enter OTP code"
              required
              className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9 autolog"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-3 mb-2 text-white shadow-md bg-button rounded-3xl"
          >
            Submit
          </button>
        </form>
        <form onSubmit={handleOnResend}>
          <button className="w-full py-2 mt-3 mb-2 text-white ">resend</button>
        </form>
      </div>
    </>
  );
}
