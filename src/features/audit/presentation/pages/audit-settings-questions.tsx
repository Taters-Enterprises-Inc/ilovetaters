import { AuditHead } from "../components/audit-head";

export function AuditSettingsQuestions() {
  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/internal/audit/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            {
              name: "Edit Questions",
              url: "/internal/audit/settings/questions",
            },
          ],
        }}
      />
    </>
  );
}
