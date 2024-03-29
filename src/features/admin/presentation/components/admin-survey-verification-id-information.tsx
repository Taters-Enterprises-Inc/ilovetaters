import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { ADMIN_SURVEY_VERIFICATION_STATUS } from "features/shared/constants";
import Moment from "react-moment";
import { selectGetAdminSurveyVerification } from "../slices/get-admin-survey-verification.slice";
import {
  adminSurveyVerificationChangeStatus,
  AdminSurveyVerificationChangeStatusState,
  resetAdminSurveyVerificationChangeStatusSliceStatus,
  selectAdminSurveyVerificationChangeStatus,
} from "../slices/admin-survey-verification-change-status.slice";
import { useEffect, useState } from "react";
import { AdminSurveyAnswerSheetModal } from "../modals";

interface AdminSurveyVerificationIDInformationProps {
  onClose: () => void;
}

export function AdminSurveyVerificationIDInformation(
  props: AdminSurveyVerificationIDInformationProps
) {
  const dispatch = useAppDispatch();

  const [openSurveyAnswerSheetModal, setOpenSurveyAnswerSheetModal] =
    useState(false);

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
  }, [adminSurveyVerificationChangeStatusState, dispatch, props]);

  const handleApprove = () => {
    if (getAdminSurveyVerificationState.data) {
      dispatch(
        adminSurveyVerificationChangeStatus({
          surveyVerificationId: getAdminSurveyVerificationState.data.id,
          invoiceNo: getAdminSurveyVerificationState.data.invoice_no,
          status: 2,
        })
      );
    }
  };

  const handleReject = () => {
    if (getAdminSurveyVerificationState.data) {
      dispatch(
        adminSurveyVerificationChangeStatus({
          surveyVerificationId: getAdminSurveyVerificationState.data.id,
          invoiceNo: getAdminSurveyVerificationState.data.invoice_no,
          status: 3,
        })
      );
    }
  };

  return (
    <>
      <div className="pt-1 text-secondary">
        <div className="space-y-1 ">
          <div className="grid-cols-2 gap-4 lg:grid ">
            <div>
              <strong>Profile Name :</strong>{" "}
              <span className="font-semibold">
                {getAdminSurveyVerificationState.data?.user.first_name}
                {getAdminSurveyVerificationState.data?.user.last_name}
              </span>
            </div>
          </div>

          <hr />

          <div className="grid-cols-2 gap-4 lg:grid ">
            <div>
              <strong>Store Name :</strong>{" "}
              <span className="font-semibold">
                {getAdminSurveyVerificationState.data?.store_name}
              </span>
            </div>
            <div>
              <strong>Invoice No :</strong>{" "}
              <span className="font-semibold">
                {getAdminSurveyVerificationState.data?.invoice_no}
              </span>
            </div>
          </div>

          <hr />

          <div className="grid-cols-2 gap-4 lg:grid ">
            <div>
              <strong>Invoice Number :</strong>{" "}
              <span className="font-semibold">
                {getAdminSurveyVerificationState.data?.invoice_no}
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
              <strong>Survey Order Type:</strong>{" "}
              <span className="font-semibold">
                {getAdminSurveyVerificationState.data?.order_type}
              </span>
            </div>
            <div>
              <strong>Survey Order Date:</strong>{" "}
              <span className="font-semibold">
                <Moment format="lll">
                  {getAdminSurveyVerificationState.data?.order_date}
                </Moment>
              </span>
            </div>
          </div>
          <hr />

          <div className="grid-cols-2 gap-4 lg:grid">
            <div className="flex flex-col space-x-2 lg:flex-row">
              <strong>Survey Answer Sheet:</strong>
              <button
                onClick={() => {
                  setOpenSurveyAnswerSheetModal(true);
                }}
                className="text-blue-600 underline"
              >
                Click to view
              </button>
            </div>
          </div>
          <hr />
        </div>

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
      <AdminSurveyAnswerSheetModal
        open={openSurveyAnswerSheetModal}
        onClose={() => {
          setOpenSurveyAnswerSheetModal(false);
        }}
      />
    </>
  );
}
