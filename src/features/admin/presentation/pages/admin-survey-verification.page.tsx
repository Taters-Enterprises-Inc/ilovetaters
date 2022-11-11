import { AdminHead, AdminSurveyVerifications } from "../components";

export function AdminSurveyVerification() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Survey Verification", url: "/admin/survey-verification" },
          ],
        }}
      />
      <AdminSurveyVerifications />
    </>
  );
}
