import { BSCHead } from "../components/bsc-head";

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
          pageTitles: [{ name: "Employee", url: "/bsc/employee" }],
        }}
      />
    </>
  );
}
