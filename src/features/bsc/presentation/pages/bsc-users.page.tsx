import { BSCHead } from "../components/bsc-head";
import { BSCUser } from "../components/bsc-users";

export function BSCUsers() {
  return (
    <>
      <BSCHead
        BSCBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/bsc",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Users", url: "/bsc/users" }],
        }}
      />
      <BSCUser />
    </>
  );
}
