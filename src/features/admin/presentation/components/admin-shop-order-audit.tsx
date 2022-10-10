import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export function AdminShopOrderAudit() {
  return (
    <div>
      <table className="hidden w-full mt-3 text-sm text-left rounded-lg lg:table customer-information-table">
        <thead className="text-xs text-white uppercase bg-secondary ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Remarks
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
