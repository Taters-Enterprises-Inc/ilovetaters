import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FormEvent, useState } from "react";
import {
  changeForgotPasswordStatus,
  changeForgotPasswordStatusAddPhoneNumber,
  ChangeForgotPasswordStatusState,
  selectChangeForgotPasswordStatus,
} from "../slices/change-forgot-password-status.slice";
import {
  forgotPasswordGenerateOTP,
  ForgotPasswordGenerateOTPState,
  resetForgotPasswordGenerateOTP,
  selectForgotPasswordGenerateOTP,
} from "../slices/forgot-password-generate-otp.slice";

import { useEffect } from "react";
import { MaterialPhoneInput } from "./material-phone-input";

interface ForgotPasswordFormElements extends HTMLFormControlsCollection {
  phoneNumber: HTMLInputElement;
}

interface ForgotPasswordFormElement extends HTMLFormElement {
  readonly elements: ForgotPasswordFormElements;
}

export function MobileForgotPasswordOtp() {
  const dispatch = useAppDispatch();
  const forgotPasswordGenerateOTPState = useAppSelector(
    selectForgotPasswordGenerateOTP
  );

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    if (
      forgotPasswordGenerateOTPState.status ===
      ForgotPasswordGenerateOTPState.success
    ) {
      dispatch(
        changeForgotPasswordStatus({
          status: ChangeForgotPasswordStatusState.mobileOtpAuthentication,
        })
      );

      dispatch(resetForgotPasswordGenerateOTP());
    }
  }, [forgotPasswordGenerateOTPState, dispatch]);

  const handleOnSubmit = (e: FormEvent<ForgotPasswordFormElement>) => {
    dispatch(
      forgotPasswordGenerateOTP({
        phoneNumber,
      })
    );

    dispatch(
      changeForgotPasswordStatusAddPhoneNumber({
        phoneNumber: phoneNumber,
      })
    );

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
          <h1 className="mb-2 text-xl font-bold text-white">Forgot Password</h1>
          <p className="mb-4 text-white">
            Please Enter Your Mobile Number To Receive a OTP Code
          </p>

          <MaterialPhoneInput
            colorTheme="white"
            value={phoneNumber}
            required
            size="small"
            fullWidth
            name="phoneNumber"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />

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
