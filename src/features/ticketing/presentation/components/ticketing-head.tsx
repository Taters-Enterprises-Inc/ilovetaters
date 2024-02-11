import {
  TicketingBreadCrumbs,
  TicketingBreadCrumbsProps,
} from "./ticketing-breadcrumbs";

interface TicketingHeadProps {
  TicketingBreadCrumbsProps: TicketingBreadCrumbsProps;
}

export function TicketingHead(props: TicketingHeadProps) {
  return (
    <div className="flex justify-between p-4">
      <TicketingBreadCrumbs {...props.TicketingBreadCrumbsProps} />
    </div>
  );
}
