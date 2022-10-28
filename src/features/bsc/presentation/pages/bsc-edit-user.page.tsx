import {
  BscEditPersonalInformation,
  BSCHead,
  BscEditUserStatus,
} from "../components";
export function BSCEditUser() {
  return (
    <>
      <BSCHead
        BSCBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/bsc",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "User", url: "/bsc/users" },
            { name: "Edit User", url: "/bsc/users/edit-user" },
          ],
        }}
      />

      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit User
        </span>

        <div className="pb-10 space-y-6">
          <span>Please enter the user's information below.</span>
          <BscEditUserStatus />
          <BscEditPersonalInformation />
        </div>
      </div>
    </>
  );
}
