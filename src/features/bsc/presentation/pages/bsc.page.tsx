import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
export function Bsc() {
  return (
    <>
      <Helmet>
        <title>Taters | Balance Score Card</title>
      </Helmet>

      <Outlet />
    </>
  );
}
