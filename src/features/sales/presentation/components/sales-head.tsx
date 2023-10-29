import { SalesBreadCrumbsProps, SalesBreadCrumbs } from "./sales-breadcrumbs";

interface SalesHeadProps {
  SalesBreadCrumbsProps: SalesBreadCrumbsProps;
}

export function SalesHead(props: SalesHeadProps) {
  return (
    <div className="flex justify-between p-4">
      <SalesBreadCrumbs {...props.SalesBreadCrumbsProps} />
    </div>
  );
}
