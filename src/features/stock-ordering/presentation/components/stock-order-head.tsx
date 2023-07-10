import {
  StockOrderBreadCrumbs,
  StockOrderBreadCrumbsProps,
} from "./stock-order-breakcrumbs";

interface StockOrderHeadHeadProps {
  StockOrderBreadCrumbsProps: StockOrderBreadCrumbsProps;
}

export function StockOrderHead(props: StockOrderHeadHeadProps) {
  return (
    <div className="flex justify-between p-4">
      <StockOrderBreadCrumbs {...props.StockOrderBreadCrumbsProps} />
    </div>
  );
}
