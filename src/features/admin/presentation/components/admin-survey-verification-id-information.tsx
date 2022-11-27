import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { selectGetAdminPopclubRedeem } from "../slices/get-admin-popclub-redeem.slice";
import {
  ADMIN_SURVEY_VERIFICATION_STATUS,
  REACT_APP_DOMAIN_URL,
} from "features/shared/constants";
import moment from "moment";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { selectGetAdminSurveyVerification } from "../slices/get-admin-survey-verification.slice";
import {
  adminSurveyVerificationChangeStatus,
  AdminSurveyVerificationChangeStatusState,
  resetAdminSurveyVerificationChangeStatusSliceStatus,
  selectAdminSurveyVerificationChangeStatus,
} from "../slices/admin-survey-verification-change-status.slice";
import React, { useEffect, useState } from "react";
import { AdminSurveyVerificationResponseModal } from "../modals";
import { createQueryParams } from "features/config/helpers";
import { useNavigate } from "react-router-dom";

interface AdminSurveyVerificationIDInformationProps {
  onClose: () => void;
}

export function AdminSurveyVerificationIDInformation(
  props: AdminSurveyVerificationIDInformationProps
) {
  const dispatch = useAppDispatch();

  const getAdminSurveyVerificationState = useAppSelector(
    selectGetAdminSurveyVerification
  );
  const adminSurveyVerificationChangeStatusState = useAppSelector(
    selectAdminSurveyVerificationChangeStatus
  );

  useEffect(() => {
    if (
      adminSurveyVerificationChangeStatusState.status ===
      AdminSurveyVerificationChangeStatusState.success
    ) {
      dispatch(resetAdminSurveyVerificationChangeStatusSliceStatus());
      props.onClose();
    }
  }, [adminSurveyVerificationChangeStatusState, dispatch]);

  const handleApprove = () => {
    if (getAdminSurveyVerificationState.data) {
      dispatch(
        adminSurveyVerificationChangeStatus({
          surveyverificationId: getAdminSurveyVerificationState.data.id,
          status: 2,
        })
      );
    }
  };

  const handleReject = () => {
    if (getAdminSurveyVerificationState.data) {
      dispatch(
        adminSurveyVerificationChangeStatus({
          surveyverificationId: getAdminSurveyVerificationState.data.id,
          status: 3,
        })
      );
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="pt-1 text-secondary">
      <div className="space-y-1 ">
        <div className="grid-cols-2 gap-4 lg:grid ">
          <div>
            <strong>Order Number :</strong>{" "}
            <span className="font-semibold">
              {getAdminSurveyVerificationState.data?.order_no ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Application Status:</strong>{" "}
            {getAdminSurveyVerificationState.data?.status ? (
              <span
                className="px-2 py-1 text-xs rounded-full "
                style={{
                  color: "white",
                  backgroundColor:
                    ADMIN_SURVEY_VERIFICATION_STATUS[
                      getAdminSurveyVerificationState.data.status
                    ].color,
                }}
              >
                {" "}
                {
                  ADMIN_SURVEY_VERIFICATION_STATUS[
                    getAdminSurveyVerificationState.data.status
                  ].name
                }
              </span>
            ) : (
              "N/A"
            )}
          </div>
        </div>

        <hr />

        <div className="grid-cols-2 gap-4 lg:grid">
          <div>
            <strong>Full Name:</strong>{" "}
            <span className="font-semibold">Walk-in</span>
          </div>
          <div className="grid-cols-2 gap-4 lg:grid">
            <div>
              <AdminSurveyVerificationResponseModal />
            </div>
          </div>
        </div>
        <hr />
      </div>

      {/* <AdminSurveyVerificationResponseModal open={open} onClose={handleClose} /> */}

      {getAdminSurveyVerificationState.data?.status === 1 ? (
        <div className="flex items-start justify-end py-3 space-x-2">
          <button
            onClick={handleReject}
            className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md"
          >
            Reject
          </button>
          <button
            onClick={handleApprove}
            className="order-1 px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:order-2 lg:mb-0"
          >
            Approve
          </button>
        </div>
      ) : null}
    </div>
  );
}
