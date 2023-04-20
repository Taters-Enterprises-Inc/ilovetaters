import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

export function Audit() {
  return (
    <>
      <Helmet>
        <title>Taters | Internal Quality Audit</title>
      </Helmet>

      <Outlet />
    </>
  );
}
