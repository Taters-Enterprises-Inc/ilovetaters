import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect, useState } from "react";
import { AiOutlineYuque } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import {
  MobileForgotPasswordNewPassword,
  MobileForgotPasswordOtp,
  MobileForgotPasswordOtpAuthentication,
} from "../components";
import {
  ChangeForgotPasswordStatusState,
  resetChangeForgotPasswordStatus,
  selectChangeForgotPasswordStatus,
} from "../slices/change-forgot-password-status.slice";

interface MobileLoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function MobileForgotPasswordModal(props: MobileLoginModalProps) {
  const dispatch = useAppDispatch();
  const [getMobileNumber, setMobilerNumber] = useState<void>();
  const changeForgotPasswordStatusState = useAppSelector(
    selectChangeForgotPasswordStatus
  );

  useEffect(() => {
    if (
      changeForgotPasswordStatusState.status ===
      ChangeForgotPasswordStatusState.finish
    ) {
      dispatch(resetChangeForgotPasswordStatus());
      props.onClose();
    }
  }, [changeForgotPasswordStatusState, dispatch, props]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  console.log(getMobileNumber);

  return (
    <>
      <div
        style={{ display: props.open ? "flex" : "none" }}
        className="fixed inset-0 z-30 flex items-center justify-center bg-secondary bg-opacity-30 backdrop-blur-sm "
      >
        <div className="bg-secondary font-['Roboto'] p-6 px-6  text-sm text-center rounded-3xl w-[90%] sm:w-[350px] relative shadow-md shadow-tertiary">
          <div className="pb-8">
            <button
              className="float-right text-xl text-white mb-1.5"
              onClick={props.onClose}
            >
              <IoMdClose />
            </button>
            {changeForgotPasswordStatusState.status ===
            ChangeForgotPasswordStatusState.sendOtp ? (
              <MobileForgotPasswordOtp
                setMobilerNumber={() => setMobilerNumber(setMobilerNumber)}
              />
            ) : changeForgotPasswordStatusState.status ===
              ChangeForgotPasswordStatusState.mobileOtpAuthentication ? (
              <MobileForgotPasswordOtpAuthentication />
            ) : changeForgotPasswordStatusState.status ===
              ChangeForgotPasswordStatusState.newPassword ? (
              <MobileForgotPasswordNewPassword />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
