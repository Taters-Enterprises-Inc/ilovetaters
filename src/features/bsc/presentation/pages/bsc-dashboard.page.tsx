import { Link } from "react-router-dom";
import { BSCHead } from "../components/bsc-head";
import { RiSurveyLine } from "react-icons/ri";
import { Dashboard } from "../components";

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
      <Dashboard />
    </>
  );
}
