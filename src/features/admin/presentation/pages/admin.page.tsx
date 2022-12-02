import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
export function Admin() {
  return (
    <>
      <Helmet>
        <title>Taters | Admin</title>
      </Helmet>

      <Outlet />
    </>
  );
}
