import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { AdminEmailTextField, AdminPasswordTextField } from "../components";
import {
  getAdminSession,
  GetAdminSessionState,
  selectGetAdminSession,
} from "../slices/get-admin-session.slice";
import {
  loginAdmin,
  LoginAdminState,
  resetLoginAdminState,
  selectLoginAdmin,
} from "../slices/login-admin.slice";
import { useEffect } from "react";

export function AdminLogin() {
  const dispatch = useAppDispatch();
  const loginAdminState = useAppSelector(selectLoginAdmin);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    if (loginAdminState.status === LoginAdminState.success) {
      dispatch(getAdminSession());
    }
  }, [loginAdminState, dispatch]);

  useEffect(() => {
    dispatch(getAdminSession());
    dispatch(resetLoginAdminState());
  }, [dispatch]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    dispatch(loginAdmin(formData));
  };

  if (
    getAdminSessionState.data &&
    getAdminSessionState.status === GetAdminSessionState.success
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return (
    <main className="flex items-center justify-center h-screen bg-paper">
      <div
        className='bg-secondary w-[90%] sm:w-[400px] mx-auto p-6 px-6 
              font-["Varela_Round"] text-xs text-center rounded-3xl shadow-md'
      >
        <div className="flex items-center justify-center header_image">
          <img
            src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/logo/taters-logo.png`}
            alt="Taters Logo"
            className="w-36"
          ></img>
        </div>
        <div className="pt-4 login-body">
          <form onSubmit={handleOnSubmit}>
            {loginAdminState.message ? (
              <span
                className="text-white"
                dangerouslySetInnerHTML={{
                  __html: loginAdminState.message,
                }}
              />
            ) : (
              <p className="text-white">
                Please login with your email/username and password below.
              </p>
            )}

            <div className="pt-4 space-y-4">
              <AdminEmailTextField />
              <AdminPasswordTextField />
            </div>

            <div className="flex justify-between py-4 text-white">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" /> Remember Me
              </p>
              <a href="#">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-2 my-2 text-white shadow-md bg-button rounded-3xl"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
