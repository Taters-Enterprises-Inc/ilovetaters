import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { getAuditResponse } from "../slices/get-audit-response.slice";
import { AppDispatch } from "features/config/store";

export function AuditReviewContent() {
  const { hash } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (hash) {
      dispatch(getAuditResponse({ hash }));
    }
  }, [hash, dispatch]);

  return (
    <>
      <div className="container max-w-screen-lg	">
        <div className="flex flex-col space-y-5">
          <div className="flex justify-center">
            <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900">
              Internal Quality Audit Evaluation Summary
            </h5>
          </div>

          <div className="flex flex-col space-y-2 text-lg border-b-8 border-primary shadow-2xl drop-shadow rounded-lg p-5">
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              Taters Cash & Carry
            </span>
            <div className="flex flex-row space-x-2 text-xs md:text-base">
              <span className="text-center">John Doe</span>
              <span>&#x2022;</span>
              <span className="text-center">Mall Cinema</span>
              <span>&#x2022;</span>
              <span className="text-center">January 2023</span>
            </div>
            <Divider />

            {/* <div>


              This div is for category table


            </div> */}

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
