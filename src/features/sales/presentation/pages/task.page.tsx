import {
  SalesHead,
  SalesTaskListCashier,
  SalesTaskListManager,
  SalesTaskListTC,
} from "../components";
import { useAppSelector } from "features/config/hooks";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { Divider } from "@mui/material";

export function SalesTask() {
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const isTC = getAdminSessionState.data?.admin.user_details.sales_groups.some(
    (group) => group.id === 2
  );

  const isManager =
    getAdminSessionState.data?.admin.user_details.sales_groups.some(
      (group) => group.id === 3
    );

  return (
    <>
      <SalesHead
        SalesBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/sales/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Task", url: "/admin/sales/task" }],
        }}
      />
      <div className="p-8 space-y-10">
        <div>
          <span className="text-secondary text-4xl font-['Bebas_Neue'] flex-1">
            Task
          </span>
        </div>
        {isTC && <SalesTaskListTC />}
        {isTC && isManager && <Divider />}
        {isManager && <SalesTaskListManager />}
      </div>
    </>
  );
}
