import { useAppDispatch, useAppSelector } from "features/config/hooks";
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
import { useEffect } from "react";

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

  const handleUnderReview = () => {
    if (getAdminSurveyVerificationState.data) {
      dispatch(
        adminSurveyVerificationChangeStatus({
          discountUserId: getAdminSurveyVerificationState.data.id,
          status: 2,
        })
      );
    }
  };

  const handleApprove = () => {
    if (getAdminSurveyVerificationState.data) {
      dispatch(
        adminSurveyVerificationChangeStatus({
          discountUserId: getAdminSurveyVerificationState.data.id,
          status: 3,
        })
      );
    }
  };

  const handleReject = () => {
    if (getAdminSurveyVerificationState.data) {
      dispatch(
        adminSurveyVerificationChangeStatus({
          discountUserId: getAdminSurveyVerificationState.data.id,
          status: 4,
        })
      );
    }
  };

  return (
    <div className="pt-1 text-secondary">
      <div className="space-y-1 ">
        <div className="grid-cols-2 gap-4 lg:grid ">
          <div>
            <strong>Receipt Number :</strong>{" "}
            <span className="font-semibold">
              {getAdminSurveyVerificationState.data?.receipt_number ?? "N/A"}
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
            <span className="font-semibold">
              {getAdminSurveyVerificationState.data?.first_name +
                " " +
                getAdminSurveyVerificationState.data?.middle_name +
                " " +
                getAdminSurveyVerificationState.data?.last_name ?? "N/A"}
            </span>
          </div>
          {/* <div>
            <strong>Discount Type:</strong>{" "}
            <span className="font-semibold">
              {getAdminSurveyVerificationState.data?.discount_type_name ??
                "N/A"}
            </span>
          </div> */}
        </div>

        <hr />

        <hr />

        <div className="grid-cols-2 gap-4 lg:grid">
          <div>
            <strong>Profile Account Name:</strong>{" "}
            <span className="font-semibold">
              {getAdminSurveyVerificationState.data?.fb_first_name ||
                getAdminSurveyVerificationState.data?.mobile_first_name}{" "}
              {getAdminSurveyVerificationState.data?.fb_last_name ||
                getAdminSurveyVerificationState.data?.mobile_last_name}
            </span>
          </div>
        </div>
      </div>

      <hr className="mt-1" />

      {/* <div className="flex flex-col pt-2 pb-4 lg:flex-row">
        <div className="flex flex-col items-center flex-1">
          <span className="font-semibold">Front</span>
          <img
            src={`${REACT_APP_DOMAIN_URL}api/load-image-user-discount/${getAdminSurveyVerificationState.data?.id_front}`}
            alt="id front"
          />
        </div>

        <div className="flex flex-col items-center flex-1">
          <span className="font-semibold">Back</span>

          <img
            src={`${REACT_APP_DOMAIN_URL}api/load-image-user-discount/${getAdminSurveyVerificationState.data?.id_back}`}
            alt="id back"
          />
        </div>
      </div> */}
      {getAdminSurveyVerificationState.data?.status === 1 ? (
        <div className="flex items-start justify-end py-3 space-x-2">
          <button
            onClick={handleReject}
            className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md"
          >
            Reject
          </button>
          <button
            onClick={handleUnderReview}
            className="order-1 px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:order-2 lg:mb-0"
          >
            Under Review
          </button>
        </div>
      ) : getAdminSurveyVerificationState.data?.status === 2 ? (
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
