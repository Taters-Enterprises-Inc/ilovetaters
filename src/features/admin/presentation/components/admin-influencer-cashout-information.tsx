import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  ADMIN_INFLUENCER_CASHOUT_STATUS,
  REACT_APP_DOMAIN_URL,
} from "features/shared/constants";
import Moment from "react-moment";
import { useEffect } from "react";
import { selectGetAdminInfluencerCashout } from "../slices/get-admin-influencer-cashout.slice";

import NumberFormat from "react-number-format";
import {
  selectAdminInfluencerCashoutChangeStatus,
  AdminInfluencerCashoutChangeStatusState,
  resetAdminInfluencerCashoutChangeStatusSliceStatus,
  adminInfluencerCashoutChangeStatus,
} from "../slices/admin-influencer-cashout-change-status.slice";

interface AdminInfluencerCashoutInformationProps {
  onClose: () => void;
}

export function AdminInfluencerCashoutInformation(
  props: AdminInfluencerCashoutInformationProps
) {
  const dispatch = useAppDispatch();

  const getAdminInfluencerCashoutState = useAppSelector(
    selectGetAdminInfluencerCashout
  );
  const adminInfluencerCashoutChangeStatusState = useAppSelector(
    selectAdminInfluencerCashoutChangeStatus
  );

  useEffect(() => {
    if (
      adminInfluencerCashoutChangeStatusState.status ===
      AdminInfluencerCashoutChangeStatusState.success
    ) {
      dispatch(resetAdminInfluencerCashoutChangeStatusSliceStatus());
      props.onClose();
    }
  }, [adminInfluencerCashoutChangeStatusState, dispatch, props]);

  return (
    <>
      <div className="pt-1 text-secondary">
        <div className="space-y-1 ">
          <div className="grid-cols-2 gap-4 lg:grid ">
            <div>
              <strong>ID Number :</strong>{" "}
              <span className="font-semibold">
                {getAdminInfluencerCashoutState.data?.id_number ?? "N/A"}
              </span>
            </div>
            <div>
              <strong>Application Status:</strong>{" "}
              {getAdminInfluencerCashoutState.data
                ?.influencer_cashout_status_id ? (
                <span
                  className="px-2 py-1 text-xs rounded-full "
                  style={{
                    color: "white",
                    backgroundColor:
                      ADMIN_INFLUENCER_CASHOUT_STATUS[
                        getAdminInfluencerCashoutState.data
                          .influencer_cashout_status_id
                      ].color,
                  }}
                >
                  {" "}
                  {
                    ADMIN_INFLUENCER_CASHOUT_STATUS[
                      getAdminInfluencerCashoutState.data
                        .influencer_cashout_status_id
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
                {getAdminInfluencerCashoutState.data?.first_name +
                  " " +
                  getAdminInfluencerCashoutState.data?.middle_name +
                  " " +
                  getAdminInfluencerCashoutState.data?.last_name ?? "N/A"}
              </span>
            </div>
          </div>

          <hr />

          <div className="grid-cols-2 gap-4 lg:grid">
            <div>
              <strong>Profile Account Name:</strong>{" "}
              <span className="font-semibold">
                {getAdminInfluencerCashoutState.data?.fb_user_name ?? ""}
                {getAdminInfluencerCashoutState.data?.mobile_user_name ?? ""}
              </span>
            </div>
          </div>

          <hr />

          {getAdminInfluencerCashoutState.data ? (
            <div className="grid-cols-2 gap-4 lg:grid">
              <div>
                <strong>Cashout:</strong>{" "}
                <span className="font-semibold">
                  <NumberFormat
                    value={parseFloat(
                      getAdminInfluencerCashoutState.data.cashout
                    ).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                  />
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <hr className="mt-1" />

        <div className="flex flex-col pt-2 pb-4 lg:flex-row">
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold">Front</span>
            <img
              src={`${REACT_APP_DOMAIN_URL}api/load-image-influencer/${getAdminInfluencerCashoutState.data?.id_front}`}
              alt="id front"
            />
          </div>

          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold">Back</span>

            <img
              src={`${REACT_APP_DOMAIN_URL}api/load-image-influencer/${getAdminInfluencerCashoutState.data?.id_back}`}
              alt="id back"
            />
          </div>
        </div>
        {getAdminInfluencerCashoutState.data?.influencer_cashout_status_id ===
        1 ? (
          <div className="flex items-start justify-end py-3 space-x-2">
            <button
              onClick={() => {
                if (getAdminInfluencerCashoutState.data) {
                  dispatch(
                    adminInfluencerCashoutChangeStatus({
                      influencerCashoutId:
                        getAdminInfluencerCashoutState.data.id,
                      status: 3,
                    })
                  );
                }
              }}
              className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md"
            >
              Reject
            </button>
            <button
              onClick={() => {
                if (getAdminInfluencerCashoutState.data) {
                  dispatch(
                    adminInfluencerCashoutChangeStatus({
                      influencerCashoutId:
                        getAdminInfluencerCashoutState.data.id,
                      status: 2,
                    })
                  );
                }
              }}
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
