import { AuditHead } from "../components/audit-head";

export function AuditSettingsQuestions() {
  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/digital/audit/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            {
              name: "Edit Questions",
              url: "/digital/audit/settings/questions",
            },
          ],
        }}
      />
    </>
  );
}
