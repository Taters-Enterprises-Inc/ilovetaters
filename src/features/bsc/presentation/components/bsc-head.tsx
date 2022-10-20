import { BSCBreadCrumbs, BSCBreadCrumbsProps } from "./bsc-breadcrumbs";
import { useState, useEffect, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";

interface BSCHeadProps {
  BSCBreadCrumbsProps: BSCBreadCrumbsProps;
}

export function BSCHead(props: BSCHeadProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div className="flex justify-between p-4">
      <BSCBreadCrumbs {...props.BSCBreadCrumbsProps} />
    </div>
  );
}
