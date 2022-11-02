import { BSCHead } from "../components/bsc-head";

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
    </>
  );
}
