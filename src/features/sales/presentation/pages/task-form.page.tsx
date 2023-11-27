import { SalesHead } from "../components";
import { useAppSelector, useQuery } from "features/config/hooks";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import SalesTaskContent from "../components/sales-task-content";

export function SalesTaskForm() {
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const query = useQuery();
  const formId = query.get("id");
  const userType = query.get("type");
  return (
    <>
      <SalesHead
        SalesBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/sales/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Task", url: "/admin/sales/task" },
            {
              name: "Task Form",
              url: `/admin/sales/task/task-form?type=${userType}&id=${formId}`,
            },
            {
              name: formId ?? "",
              url: `/admin/sales/task/task-form?type=${userType}&id=${formId}`,
            },
          ],
        }}
      />
      <div className="p-8 space-y-10">
        <div>
          <span className="text-secondary text-4xl font-['Bebas_Neue'] flex-1">
            Task Form
          </span>

          <SalesTaskContent />
        </div>
      </div>
    </>
  );
}
