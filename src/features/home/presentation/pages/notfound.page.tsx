import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loc, setLocation] = useState<string>();
  const [path, setPath] = useState<string>();

  useEffect(() => {
    if (location.pathname.includes("delivery")) {
      setLocation("Snackshop");
      setPath("/delivery");
    } else if (location.pathname.includes("shop")) {
      setLocation("Catering");
      setPath("/shop");
    } else {
      setLocation("Home");
      setPath("/");
    }
  }, [location.pathname]);

  return (
    <main className="min-h-full justify-center p-10">
      <div className="flex flex-col items-center ">
        <p className="text-9xl font-bold text-primary">404</p>
        <p className="text-2xl font-bold text-primary space-y-20">
          Page Not Found
        </p>

        <img
          src={`${REACT_APP_DOMAIN_URL}api/assets/images/popclub/mr_poppy/Poppie_Surprised.png`}
          alt="Taters Mr Poppy Suprised"
          width={300}
        />
        <button
          onClick={() => {
            path ? navigate(path) : navigate("/");
          }}
          className="inline-block px-10 py-2.5 mr-5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out"
        >
          <span className="text-lg">Go back to {loc}</span>
        </button>
      </div>
    </main>
  );
}
