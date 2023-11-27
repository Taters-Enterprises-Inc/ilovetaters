import { SalesHead } from "../components";
import { useAppSelector, useQuery } from "features/config/hooks";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import SalesTaskContent from "../components/sales-task-content";

export function SalesSavedForm() {
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
            { name: "Form List", url: "/admin/sales/form-list" },
            {
              name: "Saved Form",
              url: `/admin/sales/form-list/saved-form?type=${userType}&id=${formId}`,
            },
            {
              name: formId ?? "",
              url: `/admin/sales/form-list/saved-form?type=${userType}&id=${formId}`,
            },
          ],
        }}
      />
      <div className="p-8 space-y-10">
        <SalesTaskContent />
      </div>
    </>
  );
}
