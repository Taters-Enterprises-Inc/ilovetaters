import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export function HrLogin() {
  const navigate = useNavigate();

  const [identity, setIdentity] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <Helmet>
        <title>Taters | HR System </title>
      </Helmet>

      <div className="h-screen bg-white flex flex-col space-y-10 justify-center items-center">
        <div className="bg-white w-96 shadow-xl rounded p-5">
          <h1 className="text-3xl font-medium">Taters HR System</h1>
          <p className="text-sm">Welcome to the Taters HR System Login Page!</p>
          <form className="space-y-5 mt-5">
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
              <button className="text-primary hover:text-red-500 rounded-full px-3 ">
                show
              </button>
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
              onClick={() => {
                if (identity == "user@user.com" && password == "password") {
                  navigate({
                    pathname: "self-assessment",
                  });
                }
                if (
                  identity == "manager@manager.com" &&
                  password == "password"
                ) {
                  navigate({
                    pathname: "management-assessment",
                  });
                }
              }}
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
