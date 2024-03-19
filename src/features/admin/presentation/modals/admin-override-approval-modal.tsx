import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { MaterialDateTimeInput } from "features/shared/presentation/components";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  GetAdminCateringBookingState,
  getAdminCateringBooking,
  selectGetAdminCateringBooking,
} from "../slices/get-admin-catering-booking.slice";
import { selectAdminCateringBookingOverrideEventDate } from "../slices/admin-catering-booking-override-event-date.slice";
import {
  getCateringOverrides,
  selectGetCateringOverrides,
} from "../slices/get-catering-overrides.slice";

import Moment from "react-moment";
import moment from "moment";
import {
  adminCateringBookingApproveOverride,
  selectAdminCateringBookingApproveOverride,
} from "../slices/admin-catering-booking-approve-override.slice";

interface AdminOverrideApprovalModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

export function AdminOverrideApprovalModal(
  props: AdminOverrideApprovalModalProps
) {
  const query = useQuery();
  const dispatch = useAppDispatch();

  const trackingNo = query.get("tracking_no");

  const getAdminCateringBookingState = useAppSelector(
    selectGetAdminCateringBooking
  );
  const getCateringOverridesState = useAppSelector(selectGetCateringOverrides);
  const adminCateringBookingApproveOverrideState = useAppSelector(
    selectAdminCateringBookingApproveOverride
  );
  const adminCateringBookingOverrideEventDateState = useAppSelector(
    selectAdminCateringBookingOverrideEventDate
  );

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminCateringBooking(trackingNo));
    }
  }, [dispatch, trackingNo, adminCateringBookingApproveOverrideState]);

  useEffect(() => {
    if (
      getAdminCateringBookingState.status ===
        GetAdminCateringBookingState.success &&
      getAdminCateringBookingState.data
    ) {
      dispatch(getCateringOverrides(getAdminCateringBookingState.data.id));
    }
  }, [
    adminCateringBookingApproveOverrideState,
    adminCateringBookingOverrideEventDateState,
  ]);

  if (props.open) {
    const shopOrderModal = document.getElementById("shop-order-modal");
    if (shopOrderModal) {
      shopOrderModal.classList.remove("overflow-auto");
    }
  } else {
    const shopOrderModal = document.getElementById("shop-order-modal");
    if (shopOrderModal) {
      shopOrderModal.classList.add("overflow-auto");
    }
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">{props.title}</span>
          <button
            className="text-2xl text-white"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="px-4 pt-6 pb-2 space-y-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          <div>
            <div>
              {getAdminCateringBookingState.data ? (
                <div className="flex space-x-4">
                  <div>
                    <strong>Event Date :</strong>{" "}
                    <span className="font-semibold">
                      <Moment format="LL">
                        {moment.unix(
                          parseInt(
                            getAdminCateringBookingState.data.serving_time
                          )
                        )}
                      </Moment>
                    </span>
                  </div>
                  <div>
                    <strong>Event Time:</strong>{" "}
                    <span className="font-semibold">
                      <Moment format="LT">
                        {moment.unix(
                          parseInt(
                            getAdminCateringBookingState.data.start_datetime
                          )
                        )}
                      </Moment>{" "}
                      -{" "}
                      <Moment format="LT">
                        {moment.unix(
                          parseInt(
                            getAdminCateringBookingState.data.end_datetime
                          )
                        )}
                      </Moment>
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <table className="hidden w-full mt-3 text-sm text-left rounded-lg lg:table customer-information-table">
                <thead className="text-xs text-white uppercase bg-secondary ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Event Start
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Event End
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                {getCateringOverridesState.data &&
                getCateringOverridesState.data.length > 0 ? (
                  <tbody>
                    {getCateringOverridesState.data.map((item) => (
                      <tr>
                        <td className="px-6 py-3">{item.user}</td>
                        <td className="px-6 py-3">
                          <Moment format="LLL">
                            {moment.unix(parseInt(item.start_datetime))}
                          </Moment>
                        </td>
                        <td className="px-6 py-3">
                          <Moment format="LLL">
                            {moment.unix(parseInt(item.end_datetime))}
                          </Moment>
                        </td>
                        <td className="px-6 py-3">
                          {item.status == 0 ? (
                            <button
                              onClick={() => {
                                if (
                                  getAdminCateringBookingState.status ===
                                    GetAdminCateringBookingState.success &&
                                  getAdminCateringBookingState.data
                                ) {
                                  dispatch(
                                    adminCateringBookingApproveOverride({
                                      overrideId: item.id,
                                      transactionId:
                                        getAdminCateringBookingState.data.id,
                                      startDate: item.start_datetime,
                                      endDate: item.end_datetime,
                                    })
                                  );
                                }
                              }}
                              className="w-[100px] py-1 text-white rounded-full bg-button"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              disabled
                              className="w-[100px] py-1 text-white rounded-full bg-green-700"
                            >
                              Approved
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : null}
              </table>
              <div className="lg:hidden">
                <hr className="mt-4" />
                {getCateringOverridesState.data &&
                getCateringOverridesState.data.length > 0 ? (
                  <>
                    {getCateringOverridesState.data.map((item) => (
                      <div className="py-4 border-b">
                        <div className="text-lg font-semibold ">
                          {item.user}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Moment format="LLL">
                            {moment.unix(parseInt(item.start_datetime))}
                          </Moment>
                          <Moment format="LLL">
                            {moment.unix(parseInt(item.end_datetime))}
                          </Moment>
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
              {getCateringOverridesState.data &&
              getCateringOverridesState.data.length > 0 ? null : (
                <div className="py-4 text-center">Empty Approval</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
