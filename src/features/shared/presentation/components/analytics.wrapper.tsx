import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ReactGA from "react-ga";

ReactGA.initialize("UA-208071762-1");

export function AnalyticsWrapper() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);

  return <Outlet />;
}
