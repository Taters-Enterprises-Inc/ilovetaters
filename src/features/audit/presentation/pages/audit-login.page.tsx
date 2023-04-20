import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  MaterialInput,
  MaterialInputPassword,
} from "features/shared/presentation/components";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AuditLogin() {
  const [identity, setIdentity] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleOnSubmit = () => {
    return navigate("dashboard");
  };

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
            {/* <Link
              to={"sign-up"}
              className="block w-full py-2 my-2 text-white border-2 border-solid shadow-md border-button rounded-3xl"
            >
              CREATE ACCOUNT
            </Link> */}
          </form>
        </div>
      </div>
    </main>
  );
}
