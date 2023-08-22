import { AuditSettingsQuestionsContent } from "../components";
import { AuditHead } from "../components/audit-head";

export function AuditSettingsQuestions() {
  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/internal/dashboard/audit",
          },
          className: "lg:h-[200px]",

          pageTitles: [
            {
              name: "Settings",
              url: "/internal/settings/questions",
            },
            {
              name: "Edit Questions",
              url: "/internal/settings/questions",
            },
          ],
        }}
      />

      <AuditSettingsQuestionsContent />
    </>
  );
}
