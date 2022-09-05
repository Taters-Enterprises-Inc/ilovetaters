import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  facebookLoginPoint,
  FacebookLoginPointState,
  selectFacebookLoginPoint,
} from "features/shared/presentation/slices/facebook-login-point.slice";
import {
  facebookLogin,
  FacebookLoginState,
  selectFacebookLogin,
} from "features/shared/presentation/slices/facebook-login.slice";
import { useEffect, useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { HiOutlinePhone } from "react-icons/hi";
import { MobileLoginModal } from './mobile-login.modal';

interface LoginChooserModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginChooserModal(props: LoginChooserModalProps) {
  const facebookLoginState = useAppSelector(selectFacebookLogin);
  const facebookLoginPointState = useAppSelector(selectFacebookLoginPoint);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (facebookLoginState.status === FacebookLoginState.success) {
      dispatch(facebookLoginPoint({ currentUrl: window.location.href }));
    }
  }, [facebookLoginState, dispatch]);

  useEffect(() => {
    if (
      facebookLoginState.status === FacebookLoginState.success &&
      facebookLoginState.url &&
      facebookLoginPointState.status === FacebookLoginPointState.success
    ) {
      window.location.href = facebookLoginState.url;
    }
  }, [facebookLoginPointState, facebookLoginState]);

  const facebook = () => {
    props.onClose();
    dispatch(facebookLogin());
  };

  const [openMobileLoginModal, setOpenMobileLoginModal] = useState(false);

  return (
    <>
      <div
        style={{ display: props.open ? "flex" : "none" }}
        className="fixed inset-0 bg-secondary bg-opacity-30 backdrop-blur-sm z-30 flex justify-center items-center "
      >
        <div className="bg-secondary px-4 py-8 round w-[90%] sm:w-[400px] rounded-lg relative text-white">
          <button
            className="absolute top-2 right-4 text-white text-2xl"
            onClick={props.onClose}
          >
            <IoMdClose />
          </button>

          <h1 className="text-3xl font-['Bebas_Neue'] tracking-[3px] text-center">
            Hi! Welcome to Popclub
          </h1>
          <h2 className="text-xs text-center">
            Continue with us by connecting your existing account
          </h2>
          <button
            onClick={facebook}
            className="bg-blue-700 py-2 rounded-lg w-full flex justify-center items-center mt-4"
          >
            <BsFacebook className="mr-2" />
            <span>Continue with Facebook</span>
          </button>
          <button
            onClick={() => setOpenMobileLoginModal(true)}
            className="bg-button py-2 rounded-lg w-full flex justify-center items-center mt-4"
          >
            <HiOutlinePhone className="mr-2" />
            <span> Continue with Mobile </span>
          </button>
        </div>
      </div>

      <MobileLoginModal 
        open={openMobileLoginModal}
        onClose={() => {
          setOpenMobileLoginModal(false);
        }}
      />
    </>
  );
}
