import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
export function Admin() {
  return (
    <>
      <Helmet>
        <title>Taters | Snackshop</title>
      </Helmet>

      <Outlet />
    </>
  );
}
