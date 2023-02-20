import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useEffect } from "react";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { openLoginChooserModal } from "features/shared/presentation/slices/login-chooser-modal.slice";
import { useNavigate, useParams } from "react-router-dom";

export function SurveyLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const query = useQuery();

  const service = query.get("service");

  const getSessionState = useAppSelector(selectGetSession);

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data?.userData === null
    ) {
      dispatch(openLoginChooserModal({ required: true }));
    }
  }, [getSessionState, dispatch]);

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data?.userData
    ) {
      if (service) {
        navigate("/feedback/" + service);
      } else {
        navigate("/feedback");
      }
    }
  }, [getSessionState, navigate, service]);

  return <div></div>;
}
