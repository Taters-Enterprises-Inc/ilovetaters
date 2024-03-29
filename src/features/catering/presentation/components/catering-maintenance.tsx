import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useNavigate } from "react-router-dom";

export function CateringMaintenance() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto flex flex-col justify-center items-start pt-8 pb-16">
      <img
        src={`${REACT_APP_DOMAIN_URL}api/assets/images/popclub/mr_poppy/Poppie_Ver2_Megaphone.png`}
        alt="Taters Mr Poppy Suprised"
        width={300}
      />
      <div className="space-y-2">
        <div className="flex items-end">
          <span className="text-6xl font-bold text-primary">
            {" "}
            Taters Catering will be back soon!
          </span>
        </div>
        <p className="font-bold text-primary space-y-20 ">
          Taters is closed from April 6, 2023 to April 7, 2023 in observance of
          the holy week. We will be back on April 8, 2023. Thank you
        </p>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="inline-block mt-4 px-10 py-2.5 mr-5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md transition duration-150 ease-in-out"
      >
        <span className="text-lg">Go to home</span>
      </button>
    </main>
  );
}
