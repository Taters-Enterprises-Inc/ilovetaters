import { SalesHead } from "../components";
import { useAppSelector } from "features/config/hooks";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import SalesTaskContent from "../components/sales-task-content";

export function SalesTaskForm() {
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

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
            Task Form
          </span>

          <SalesTaskContent />
        </div>
      </div>
    </>
  );
}
