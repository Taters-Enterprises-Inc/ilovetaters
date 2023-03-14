import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetAdminPopclubRedeem } from "../slices/get-admin-popclub-redeem.slice";
import {
  ADMIN_POPCLUB_REDEEM_STATUS,
  ADMIN_USER_DISCOUNT_STATUS,
  REACT_APP_DOMAIN_URL,
} from "features/shared/constants";
import moment from "moment";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { selectGetAdminUserDiscount } from "../slices/get-admin-discount-verification.slice";
import {
  adminUserDiscountChangeStatus,
  AdminUserDiscountChangeStatusState,
  resetAdminUserDiscountChangeStatusSliceStatus,
  selectAdminUserDiscountChangeStatus,
} from "../slices/admin-user-discount-change-status.slice";
import { useEffect } from "react";

interface AdminIdUserDiscountInformationProps {
  onClose: () => void;
}

export function AdminIdUserDiscountInformation(
  props: AdminIdUserDiscountInformationProps
) {
  const dispatch = useAppDispatch();

  const getAdminUserDiscountState = useAppSelector(selectGetAdminUserDiscount);
  const adminUserDiscountChangeStatusState = useAppSelector(
    selectAdminUserDiscountChangeStatus
  );

  useEffect(() => {
    if (
      adminUserDiscountChangeStatusState.status ===
      AdminUserDiscountChangeStatusState.success
    ) {
      dispatch(resetAdminUserDiscountChangeStatusSliceStatus());
      props.onClose();
    }
  }, [adminUserDiscountChangeStatusState, dispatch]);

  const handleUnderReview = () => {
    if (getAdminUserDiscountState.data) {
      dispatch(
        adminUserDiscountChangeStatus({
          discountUserId: getAdminUserDiscountState.data.id,
          status: 2,
        })
      );
    }
  };

  const handleApprove = () => {
    if (getAdminUserDiscountState.data) {
      dispatch(
        adminUserDiscountChangeStatus({
          discountUserId: getAdminUserDiscountState.data.id,
          status: 3,
        })
      );
    }
  };

  const handleReject = () => {
    if (getAdminUserDiscountState.data) {
      dispatch(
        adminUserDiscountChangeStatus({
          discountUserId: getAdminUserDiscountState.data.id,
          status: 4,
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
              <strong>ID Number :</strong>{" "}
              <span className="font-semibold">
                {getAdminUserDiscountState.data?.id_number ?? "N/A"}
              </span>
            </div>
            <div>
              <strong>Application Status:</strong>{" "}
              {getAdminUserDiscountState.data?.status ? (
                <span
                  className="px-2 py-1 text-xs rounded-full "
                  style={{
                    color: "white",
                    backgroundColor:
                      ADMIN_USER_DISCOUNT_STATUS[
                        getAdminUserDiscountState.data.status
                      ].color,
                  }}
                >
                  {" "}
                  {
                    ADMIN_USER_DISCOUNT_STATUS[
                      getAdminUserDiscountState.data.status
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
                {getAdminUserDiscountState.data?.first_name +
                  " " +
                  getAdminUserDiscountState.data?.middle_name +
                  " " +
                  getAdminUserDiscountState.data?.last_name ?? "N/A"}
              </span>
            </div>
            <div>
              <strong>Discount Type:</strong>{" "}
              <span className="font-semibold">
                {getAdminUserDiscountState.data?.discount_name ?? "N/A"}
              </span>
            </div>
          </div>

          <hr />

          <div className="grid-cols-2 gap-4 lg:grid">
            <div>
              <strong>Birthday:</strong>{" "}
              <span className="font-semibold">
                <Moment format="LLL">
                  {getAdminUserDiscountState.data?.birthday}
                </Moment>
              </span>
            </div>
          </div>

          <hr />

          <div className="grid-cols-2 gap-4 lg:grid">
            <div>
              <strong>Profile Account Name:</strong>{" "}
              <span className="font-semibold">
                {getAdminUserDiscountState.data?.fb_first_name ||
                  getAdminUserDiscountState.data?.mobile_first_name}{" "}
                {getAdminUserDiscountState.data?.fb_last_name ||
                  getAdminUserDiscountState.data?.mobile_last_name}
              </span>
            </div>
          </div>
        </div>

        <hr className="mt-1" />

        <div className="flex flex-col pt-2 pb-4 lg:flex-row">
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold">Front</span>
            <img
              src={`${REACT_APP_DOMAIN_URL}api/load-image-user-discount/${getAdminUserDiscountState.data?.id_front}`}
              alt="id front"
            />
          </div>

          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold">Back</span>

            <img
              src={`${REACT_APP_DOMAIN_URL}api/load-image-user-discount/${getAdminUserDiscountState.data?.id_back}`}
              alt="id back"
            />
          </div>
        </div>
        {getAdminUserDiscountState.data?.status === 1 ? (
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
        ) : getAdminUserDiscountState.data?.status === 2 ? (
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
    </>
  );
}
