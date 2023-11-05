import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
export function Hr() {
  return (
    <>
      <Helmet>
        <title>Taters | Human Resource</title>
      </Helmet>

      <Outlet />
    </>
  );
}
