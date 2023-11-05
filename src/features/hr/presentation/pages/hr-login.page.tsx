import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FormEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { LoginHrState, loginHr, selectLoginHr } from "../slices/login-hr.slice";
import {
  GetHrSessionState,
  getHrSession,
  selectGetHrSession,
} from "../slices/get-hr-session.slice";

export function HrLogin() {
  const dispatch = useAppDispatch();
  const loginHrState = useAppSelector(selectLoginHr);
  const getHrSessionState = useAppSelector(selectGetHrSession);

  const [identity, setIdentity] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (loginHrState.status === LoginHrState.success) {
      dispatch(getHrSession());
    }
  }, [loginHrState, dispatch]);

  useEffect(() => {
    dispatch(getHrSession());
  }, [dispatch]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    dispatch(
      loginHr({
        identity,
        password,
      })
    );
    e.preventDefault();
  };

  if (
    getHrSessionState.data &&
    getHrSessionState.status === GetHrSessionState.success
  ) {
    return <Navigate to={"/hr/self-assessment"} />;
  }

  return (
    <>
      <div className="h-screen bg-white flex flex-col space-y-10 justify-center items-center">
        <div className="bg-white w-96 shadow-xl rounded p-5">
          <h1 className="text-3xl font-medium">Taters HR System</h1>
          {loginHrState.message ? (
            <span
              className="text-sm"
              dangerouslySetInnerHTML={{
                __html: loginHrState.message,
              }}
            />
          ) : (
            <p className="text-sm">
              Please login with your email/username and password below.
            </p>
          )}
          <form className="space-y-5 mt-5" onSubmit={handleOnSubmit}>
            <input
              type="text"
              className="w-full h-12 border border-gray-800 rounded px-3"
              placeholder="E-mail"
              value={identity}
              onChange={(e) => {
                setIdentity(e.target.value);
              }}
            />
            <div className="w-full flex items-center  border border-gray-800 rounded px-3">
              <input
                type="password"
                className="w-4/5 h-12"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* <button className="text-primary hover:text-red-500 rounded-full px-3 ">
                show
              </button> */}
            </div>

            <div className="">
              <a
                href="#!"
                className="font-medium text-primary hover:text-red-500 rounded-full p-2"
              >
                Forget password ?
              </a>
            </div>

            <button
              type="submit"
              className="text-center w-full bg-primary rounded-full text-white py-3 font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
