import { Link } from "react-router-dom";
import { BSCHead } from "../components/bsc-head";
import { RiSurveyLine } from "react-icons/ri";

export function BscDashboard() {
  return (
    <>
      <BSCHead
        BSCBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/bsc",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Dashboard", url: "/bsc/dashboard" }],
        }}
      />
      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          DASHBOARD
        </span>
        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div>
            <Link
              to="form"
              className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
            >
              <RiSurveyLine size={20} />
              <span>&nbsp;&nbsp;Go to form</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
