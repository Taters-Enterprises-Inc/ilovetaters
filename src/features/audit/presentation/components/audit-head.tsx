import { AuditBreadCrumbs, AuditBreadCrumbsProps } from "./audit-breadcrumbs";

interface AuditHeadProps {
  AuditBreadCrumbsProps: AuditBreadCrumbsProps;
}

export function AuditHead(props: AuditHeadProps) {
  return (
    <div className="flex justify-between p-4">
      <AuditBreadCrumbs {...props.AuditBreadCrumbsProps} />
    </div>
  );
}
