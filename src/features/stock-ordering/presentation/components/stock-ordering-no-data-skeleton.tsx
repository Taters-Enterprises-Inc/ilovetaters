import { Skeleton } from "@mui/material";

interface StockOrderingOnLoadingSkeletonProps {
  remarks?: boolean;
  firstDoubleComponents?: boolean;
  secondDoubleComponents?: boolean;
  dispatchDoubleComponent?: boolean;
  confirmPaymentFullwidthButton?: boolean;
}

export function StockOrderingWatingSkeleton(
  props: StockOrderingOnLoadingSkeletonProps
) {
  return (
    <div className="flex flex-col overflow-hidden space-y-3">
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={300}
        sx={{ width: "100%" }}
      />

      {props.dispatchDoubleComponent && (
        <div className="flex space-x-3">
          <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            sx={{ width: "50%" }}
          />

          <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            sx={{ width: "50%" }}
          />
        </div>
      )}

      {props.remarks && (
        <Skeleton
          variant="rounded"
          animation="wave"
          height={50}
          sx={{ width: "100%" }}
        />
      )}

      {props.firstDoubleComponents && (
        <div className="flex space-x-3">
          <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            sx={{ width: "50%" }}
          />

          <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            sx={{ width: "50%" }}
          />
        </div>
      )}

      {props.secondDoubleComponents && (
        <div className="flex space-x-3">
          <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            sx={{ width: "50%" }}
          />

          <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            sx={{ width: "50%" }}
          />
        </div>
      )}

      {props.confirmPaymentFullwidthButton && (
        <Skeleton
          variant="rounded"
          animation="wave"
          height={30}
          sx={{ width: "100%" }}
        />
      )}
    </div>
  );
}
