import {
  selectGetAdminSession,
  getAdminSession,
  GetAdminSessionState,
} from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  MaterialInput,
  MaterialInputPassword,
} from "features/shared/presentation/components";
import React, { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

interface StateType {
  pathname: string;
}

export function StockOrderLogin() {
  const dispatch = useAppDispatch();
  //   const loginAuditState = useAppSelector(selectLoginAudit);
  //   const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const location = useLocation();
  const state = location.state as StateType;

  const [identity, setIdentity] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // useEffect(() => {
  //   if (loginAuditState.status === LoginAuditState.success) {
  //     dispatch(getAdminSession());
  //   }
  // }, [loginAuditState, dispatch]);

  // useEffect(() => {
  //   dispatch(getAdminSession());
  //   dispatch(resetLoginAuditState());
  // }, [dispatch]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    //   dispatch(
    //     loginAudit({
    //       identity,
    //       password,
    //     })
    //   );
    e.preventDefault();
  };

  // if (
  //   getAdminSessionState.data &&
  //   getAdminSessionState.status === GetAdminSessionState.success &&
  //   getAdminSessionState.data.admin.is_audit_admin === true
  // ) {
  //   // if (state && state.pathname && state.pathname.includes("/form/review/")) {
  //   //   return <Navigate to={state.pathname} />;
  //   // } else {
  //   return <Navigate to="dashboard/audit" />;
  //   // }
  // }

  return (
    <main className="flex items-center justify-center h-screen bg-paper">
      <div
        className='bg-secondary w-[90%] sm:w-[400px] mx-auto p-6 px-6 
                text-sm text-center rounded-3xl shadow-md font-["Varela_Round"]'
      >
        <div className="flex items-center justify-center header_image">
          <img
            src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/logo/taters-logo.png`}
            alt="Taters Logo"
            className="w-36"
          />
        </div>
        <div className="pt-4 login-body">
          <form onSubmit={handleOnSubmit}>
            <p className="text-white">
              Please login with your email/username and password below.
            </p>
            <div className="pt-4 space-y-4">
              <MaterialInput
                colorTheme="white"
                type="email"
                label="Email"
                size="small"
                fullWidth
                name="identity"
                value={identity}
                onChange={(e) => {
                  setIdentity(e.target.value);
                }}
              />
              <MaterialInputPassword
                label="Password"
                size="small"
                name="password"
                colorTheme="white"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
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
