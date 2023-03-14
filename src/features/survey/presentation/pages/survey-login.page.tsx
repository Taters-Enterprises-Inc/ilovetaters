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
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HeaderNav } from "features/shared/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export function SurveyLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const query = useQuery();

  const service = query.get("service");
  const hash = query.get("hash");

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
      if (service && hash) {
        navigate("/feedback/" + service + "/" + hash);
      } else {
        navigate("/feedback/walk-in");
      }
    }
  }, [getSessionState, navigate, service, hash]);

  return (
    <>
      <Helmet>
        <title>Taters | Customer Satisfaction Survey</title>
      </Helmet>

      <main className="min-h-screen bg-paper">
        <HeaderNav
          activeUrl="HOME"
          homePageUrl="/"
          logoProps={{
            src:
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shared/logo/taters-logo.png",
            alt: "Taters Logo",
            className: "w-[150px] lg:w-[120px]",
          }}
        />
      </main>
    </>
  );
}
