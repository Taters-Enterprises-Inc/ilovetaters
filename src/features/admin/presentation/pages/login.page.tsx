import { BrowserRouter as Router, Link } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";

export function Login() {
  return (
    <main className="h-screen bg-primary ">
      <section className="grid h-screen ml-2 mr-2 place-items-center">
        <div
          className='bg-secondary max-w-[350px] mx-auto p-6 px-6 
              font-["Roboto"] text-sm text-center rounded-3xl shadow-md shadow-tertiary'
        >
          <div className="flex items-center justify-center header_image">
            <img
              src="https://ilovetaters.com/staging/uploads/images/shop/snackshop-logo-creamy-red.png"
              alt="taterslogo"
              className="w-36"
            ></img>
          </div>

          <div className="pt-4 login-body">
            <form>
              <p className="text-white">
                Please login with your email/username and password below.
              </p>
              <div className="flex items-center w-full mt-6 bg-gray-100 p2 rounded-2xl">
                {/* <TextField required id="email" label="Email" variant="outlined"/> */}
                <FaRegEnvelope className="m-2" />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9"
                ></input>
              </div>
              <div className="flex items-center w-full mt-4 bg-gray-100 p2 rounded-2xl">
                <MdLockOutline className="m-2" />
                <input
                  type="password"
                  name="passw"
                  placeholder="Password"
                  className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9"
                ></input>
              </div>

              <div className="flex justify-between py-4 text-white">
                <p className="flex items-center">
                  <input className="mr-2" type="checkbox" /> Remember Me
                </p>
                <a href="#">Forgot Password?</a>
              </div>
              <button className="w-full py-2 my-2 text-white shadow-md bg-button rounded-3xl">
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
