import { BSCHead } from "../components/bsc-head";
import { BSCUsers } from "../components/bsc-users";

export function BSCUser() {
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
      <BSCUsers />
    </>
  );
}
