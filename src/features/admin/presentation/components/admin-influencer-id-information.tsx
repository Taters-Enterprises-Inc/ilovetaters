import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  ADMIN_INFLUENCER_STATUS,
  REACT_APP_DOMAIN_URL,
} from "features/shared/constants";
import Moment from "react-moment";
import { useEffect } from "react";
import { selectGetAdminInfluencer } from "../slices/get-admin-influencer.slice";
import {
  selectAdminInfluencerChangeStatus,
  AdminInfluencerChangeStatusState,
  adminInfluencerChangeStatus,
  resetAdminInfluencerChangeStatusSliceStatus,
} from "../slices/admin-influencer-change-status.slice";

interface AdminIdInfluencerInformationProps {
  onClose: () => void;
}

export function AdminIdInfluencerInformation(
  props: AdminIdInfluencerInformationProps
) {
  const dispatch = useAppDispatch();

  const getAdminInfluencerState = useAppSelector(selectGetAdminInfluencer);
  const adminInfluencerChangeStatusState = useAppSelector(
    selectAdminInfluencerChangeStatus
  );

  useEffect(() => {
    if (
      adminInfluencerChangeStatusState.status ===
      AdminInfluencerChangeStatusState.success
    ) {
      dispatch(resetAdminInfluencerChangeStatusSliceStatus());
      props.onClose();
    }
  }, [adminInfluencerChangeStatusState, dispatch, props]);

  const handleUnderReview = () => {
    if (getAdminInfluencerState.data) {
      dispatch(
        adminInfluencerChangeStatus({
          influencerUserId: getAdminInfluencerState.data.id,
          status: 2,
        })
      );
    }
  };

  const handleApprove = () => {
    if (getAdminInfluencerState.data) {
      dispatch(
        adminInfluencerChangeStatus({
          influencerUserId: getAdminInfluencerState.data.id,
          status: 3,
        })
      );
    }
  };

  const handleReject = () => {
    if (getAdminInfluencerState.data) {
      dispatch(
        adminInfluencerChangeStatus({
          influencerUserId: getAdminInfluencerState.data.id,
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
                {getAdminInfluencerState.data?.id_number ?? "N/A"}
              </span>
            </div>
            <div>
              <strong>Application Status:</strong>{" "}
              {getAdminInfluencerState.data?.status ? (
                <span
                  className="px-2 py-1 text-xs rounded-full "
                  style={{
                    color: "white",
                    backgroundColor:
                      ADMIN_INFLUENCER_STATUS[
                        getAdminInfluencerState.data.status
                      ].color,
                  }}
                >
                  {" "}
                  {
                    ADMIN_INFLUENCER_STATUS[getAdminInfluencerState.data.status]
                      .name
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
                {getAdminInfluencerState.data?.first_name +
                  " " +
                  getAdminInfluencerState.data?.middle_name +
                  " " +
                  getAdminInfluencerState.data?.last_name ?? "N/A"}
              </span>
            </div>
          </div>

          <hr />

          <div className="grid-cols-2 gap-4 lg:grid">
            <div>
              <strong>Birthday:</strong>{" "}
              <span className="font-semibold">
                <Moment format="LLL">
                  {getAdminInfluencerState.data?.birthday}
                </Moment>
              </span>
            </div>
          </div>

          <hr />

          <div className="grid-cols-2 gap-4 lg:grid">
            <div>
              <strong>Profile Account Name:</strong>{" "}
              <span className="font-semibold">
                {getAdminInfluencerState.data?.fb_first_name ||
                  getAdminInfluencerState.data?.mobile_first_name}{" "}
                {getAdminInfluencerState.data?.fb_last_name ||
                  getAdminInfluencerState.data?.mobile_last_name}
              </span>
            </div>
          </div>
        </div>

        <hr className="mt-1" />

        <div className="flex flex-col pt-2 pb-4 lg:flex-row">
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold">Front</span>
            <img
              src={`${REACT_APP_DOMAIN_URL}api/load-image-influencer/${getAdminInfluencerState.data?.id_front}`}
              alt="id front"
            />
          </div>

          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold">Back</span>

            <img
              src={`${REACT_APP_DOMAIN_URL}api/load-image-influencer/${getAdminInfluencerState.data?.id_back}`}
              alt="id back"
            />
          </div>
        </div>
        {getAdminInfluencerState.data?.status === 1 ? (
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
        ) : getAdminInfluencerState.data?.status === 2 ? (
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
