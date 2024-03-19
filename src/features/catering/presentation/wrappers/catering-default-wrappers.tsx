import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { getCateringCategoryProducts } from "../slices/get-catering-category-products.slice";

export function CateringDefaultWrappers() {
  const dispatch = useAppDispatch();

  const getSessionState = useAppSelector(selectGetSession);

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data &&
      getSessionState.data.cache_data?.region_id
    ) {
      dispatch(
        getCateringCategoryProducts({
          region_id: getSessionState.data.cache_data.region_id,
        })
      );
    }
  }, [getSessionState, dispatch]);

  return <Outlet />;
}
