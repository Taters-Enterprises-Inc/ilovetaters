import { BSCHead } from "../components/bsc-head";
import { BSCScoreCardPage } from "../components/bsc-score-card";

export function BSCEmployee() {
  return (
    <>
      <BSCHead
        BSCBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/bsc",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Employees", url: "/bsc/employee" }],
        }}
      />
      <BSCScoreCardPage />
    </>
  );
}
