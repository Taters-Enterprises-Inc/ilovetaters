import { Skeleton } from "@mui/material";

interface StockOrderingOnLoadingSkeletonProps {
  tab: number;
}

const doubleComponent = () => {
  return (
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
  );
};

const fullWidthComponent = () => {
  return (
    <Skeleton
      variant="rounded"
      animation="wave"
      height={30}
      sx={{ width: "100%" }}
    />
  );
};

export function StockOrderingWatingSkeleton(
  props: StockOrderingOnLoadingSkeletonProps
) {
  const handleShowSkeleton = () => {
    switch (props.tab) {
      case 0:
        return (
          <>
            {fullWidthComponent()}
            {doubleComponent()}
            {doubleComponent()}
          </>
        );
      case 1:
        return (
          <>
            {fullWidthComponent()}
            {doubleComponent()}
          </>
        );

      case 2:
        return (
          <>
            {fullWidthComponent()}
            {doubleComponent()}
          </>
        );

      case 3:
        return (
          <>
            {fullWidthComponent()}
            {doubleComponent()}
          </>
        );

      case 4:
        return (
          <>
            {fullWidthComponent()}
            {doubleComponent()}
          </>
        );

      case 5:
        return (
          <>
            {fullWidthComponent()}
            {doubleComponent()}
          </>
        );

      case 6:
        return (
          <>
            {fullWidthComponent()}
            {doubleComponent()}
          </>
        );

      case 8:
        return (
          <>
            {fullWidthComponent()}
            {doubleComponent()}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col overflow-hidden space-y-3">
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={300}
        sx={{ width: "100%" }}
      />
      <div className="space-y-3">{handleShowSkeleton()}</div>
    </div>
  );
}
