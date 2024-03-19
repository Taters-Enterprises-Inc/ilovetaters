import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  ADMIN_SNACKSHOP_MOP_STATUS,
  ADMIN_CATERING_BOOKING_STATUS,
  CATERING_BOOKING_STATUS,
  REACT_APP_DOMAIN_URL,
} from "features/shared/constants";
import NumberFormat from "react-number-format";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import {
  selectGetAdminCateringStores,
  getAdminCateringStores,
} from "../slices/get-admin-catering-stores.slice";
import {
  AdminOverrideApprovalModal,
  AdminOverrideDateModal,
  AdminPasswordModal,
} from "../modals";
import {
  adminCateringPrivilege,
  AdminCateringPrivilegeState,
  selectAdminCateringPrivilege,
  resetAdminCateringPrivilege,
} from "../slices/admin-catering-privilege.slice";
import { AdminCateringBookingCustomerInformationButtons } from "./admin-catering-booking-customer-information-buttons";
import {
  getAdminCateringBooking,
  GetAdminCateringBookingState,
  selectGetAdminCateringBooking,
} from "../slices/get-admin-catering-booking.slice";
import Moment from "react-moment";
import moment from "moment";
import { MaterialInput } from "features/shared/presentation/components";
import { AdminCateringEditFlavor } from "./admin-catering-edit-flavor";
import { selectUpdateAdminCateringOrderItemRemarks } from "../slices/update-admin-catering-order-item-remarks.slice";
import { adminCateringBookingOverrideEventDate } from "../slices/admin-catering-booking-override-event-date.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";

export function AdminCateringBookingCustomerInformation() {
  const query = useQuery();
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<string>("");
  const [store, setStore] = useState<string>("");

  const [
    openAdminPasswordStoreChangeModal,
    setOpenAdminPasswordStoreChangeModal,
  ] = useState<boolean>(false);
  const [
    openAdminPasswordStatusChangeModal,
    setOpenAdminPasswordStatusChangeModal,
  ] = useState<boolean>(false);
  const [openOverrideDateModal, setOpenOverrideDateModal] =
    useState<boolean>(false);
  const [openOverrideApprovalModal, setOpenOverrideApprovalModal] =
    useState<boolean>(false);

  const trackingNo = query.get("tracking_no");

  const getAdminCateringBookingState = useAppSelector(
    selectGetAdminCateringBooking
  );
  const getAdminCateringStoresState = useAppSelector(
    selectGetAdminCateringStores
  );

  const adminCateringPrivilegeState = useAppSelector(
    selectAdminCateringPrivilege
  );

  const updateAdminCateringOrderItemRemarksState = useAppSelector(
    selectUpdateAdminCateringOrderItemRemarks
  );
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    if (
      getAdminCateringBookingState.status ===
        GetAdminCateringBookingState.success &&
      getAdminCateringBookingState.data
    ) {
      setStatus(getAdminCateringBookingState.data.status.toString());
      setStore(getAdminCateringBookingState.data.store.toString());
    }
  }, [getAdminCateringBookingState]);

  useEffect(() => {
    if (
      adminCateringPrivilegeState.status === AdminCateringPrivilegeState.success
    ) {
      dispatch(resetAdminCateringPrivilege());
      setOpenAdminPasswordStatusChangeModal(false);
      setOpenAdminPasswordStoreChangeModal(false);
    }
  }, [adminCateringPrivilegeState, dispatch]);

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminCateringBooking(trackingNo));
    }
  }, [
    dispatch,
    trackingNo,
    adminCateringPrivilegeState,
    updateAdminCateringOrderItemRemarksState,
  ]);

  useEffect(() => {
    dispatch(getAdminCateringStores());
  }, [dispatch]);

  const calculateWithZeroIfNoValue = (value: string) => {
    if (value)
      return (
        <NumberFormat
          value={parseInt(value).toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );

    return "₱0.00";
  };

  const calculateGrandTotal = () => {
    let calculatedPrice = 0;
    const orders = getAdminCateringBookingState.data?.items;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice +=
          parseInt(orders[i].product_price) * orders[i].quantity;
      }
    }

    if (getAdminCateringBookingState.data?.service_fee) {
      calculatedPrice += getAdminCateringBookingState.data?.service_fee;
    }
    if (getAdminCateringBookingState.data?.distance_price) {
      calculatedPrice += parseInt(
        getAdminCateringBookingState.data?.distance_price
      );
    }

    if (getAdminCateringBookingState.data?.additional_hour_charge) {
      calculatedPrice +=
        getAdminCateringBookingState.data?.additional_hour_charge;
    }

    if (getAdminCateringBookingState.data?.night_diff_fee) {
      calculatedPrice += getAdminCateringBookingState.data?.night_diff_fee;
    }

    if (
      getAdminCateringBookingState.data &&
      getAdminCateringBookingState.data.discount
    ) {
      calculatedPrice -= parseInt(getAdminCateringBookingState?.data.discount);
    }

    if (getAdminCateringBookingState.data?.cod_fee) {
      calculatedPrice += parseInt(getAdminCateringBookingState.data?.cod_fee);
    }
    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  return (
    <>
      <div className="pt-1 text-secondary">
        <div className="space-y-1 ">
          <div className="grid-cols-3 gap-4 lg:grid ">
            <div>
              <strong>Tracking Number:</strong>{" "}
              <span className="font-semibold">
                {getAdminCateringBookingState.data?.tracking_no ?? "N/A"}
              </span>
            </div>
            {getAdminCateringBookingState.data ? (
              <div>
                <strong>Mode of Payment: </strong>
                <span className="font-semibold">
                  {
                    ADMIN_SNACKSHOP_MOP_STATUS[
                      getAdminCateringBookingState.data.payops
                    ]
                  }
                </span>
              </div>
            ) : null}
          </div>

          <hr />

          <div className="grid-cols-3 gap-4 lg:grid">
            <div>
              <strong>Full Name:</strong>{" "}
              <span className="font-semibold">
                {getAdminCateringBookingState.data?.account_name ?? "N/A"}
              </span>
            </div>
            <div>
              <strong>Contact Number:</strong>{" "}
              <span className="font-semibold">
                {getAdminCateringBookingState.data?.contact_number ?? "N/A"}
              </span>
            </div>
            <div>
              <strong>Email:</strong>{" "}
              <span className="font-semibold">
                {getAdminCateringBookingState.data?.account_email ?? "N/A"}
              </span>
            </div>
          </div>

          <hr />

          <div className="grid-cols-2 gap-4 space-y-2 lg:grid lg:space-y-0">
            <div>
              <strong>Order Status:</strong>{" "}
              {getAdminCateringBookingState.data ? (
                <span
                  className="px-2 py-1 text-xs rounded-full "
                  style={{
                    color: "white",
                    backgroundColor:
                      CATERING_BOOKING_STATUS[
                        getAdminCateringBookingState.data.status
                      ].color,
                  }}
                >
                  {
                    CATERING_BOOKING_STATUS[
                      getAdminCateringBookingState.data.status
                    ].name
                  }
                </span>
              ) : null}
            </div>
            <div>
              <strong>Invoice Number:</strong>{" "}
              {getAdminCateringBookingState.data?.invoice_num ? (
                <>{getAdminCateringBookingState.data.invoice_num}</>
              ) : (
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    color: "white",
                    backgroundColor: "#b32400",
                  }}
                >
                  For Confirmation
                </span>
              )}
            </div>
          </div>

          <hr />

          <div className="flex flex-col py-2 space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
            <div className="flex flex-col flex-1 lg:flex-row">
              <MaterialInput
                colorTheme="black"
                size="small"
                select
                name="toStatusId"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as string);
                }}
              >
                {ADMIN_CATERING_BOOKING_STATUS.map((value, index) => {
                  if (index === 0 || value.name === "") {
                    return null;
                  }
                  return (
                    <MenuItem key={index} value={index}>
                      {value.name}
                    </MenuItem>
                  );
                })}
              </MaterialInput>
              <button
                onClick={() => {
                  setOpenAdminPasswordStatusChangeModal(true);
                }}
                className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0"
              >
                Change Booking Status
              </button>
            </div>
          </div>

          <hr />

          <div className="flex flex-col flex-1 lg:flex-row">
            <MaterialInput
              colorTheme="black"
              size="small"
              select
              value={store}
              onChange={(e) => {
                setStore(e.target.value as string);
              }}
              name="toStoreId"
            >
              {getAdminCateringStoresState.data?.map((store, index) => (
                <MenuItem key={index} value={store.store_id}>
                  {store.name}
                </MenuItem>
              ))}
            </MaterialInput>
            <button
              onClick={() => {
                setOpenAdminPasswordStoreChangeModal(true);
              }}
              className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0"
            >
              Transfer to Store
            </button>
          </div>
        </div>

        <hr className="mt-1" />

        <div className="pt-2 pb-3">
          <span className="text-xl font-bold">Catering Information</span>
          <div className="mt-1">
            <strong>Address:</strong>{" "}
            <span className="font-semibold">
              {getAdminCateringBookingState.data?.add_address ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Contact Person:</strong>{" "}
            <span className="font-semibold">
              {getAdminCateringBookingState.data?.client_name ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Contact Number:</strong>{" "}
            <span className="font-semibold">
              {getAdminCateringBookingState.data?.add_contact ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Contact Email Address:</strong>{" "}
            <span className="font-semibold">
              {getAdminCateringBookingState.data?.email ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Payment Terms:</strong>{" "}
            <span className="font-semibold">
              {getAdminCateringBookingState.data?.payment_plan === "half"
                ? "Partial Payment (50% / 50%)"
                : getAdminCateringBookingState.data?.payment_plan === "full"
                ? "Full Payment (100%)"
                : "N/A"}
            </span>
          </div>
        </div>

        <hr className="mt-1" />

        {getAdminCateringBookingState.data ? (
          <div className="pt-2 pb-3">
            <span className="text-xl font-bold">Catering Details</span>
            <div className="grid-cols-2 gap-4 lg:grid">
              <div>
                <div className="mt-1">
                  <strong>Event Date:</strong>{" "}
                  <span className="font-semibold">
                    <Moment format="LL">
                      {moment.unix(
                        parseInt(getAdminCateringBookingState.data.serving_time)
                      )}
                    </Moment>
                  </span>
                  {getAdminCateringBookingState.data.override_id &&
                  getAdminCateringBookingState.data.override_status != null &&
                  getAdminSessionState.data?.admin.user_id ==
                    getAdminCateringBookingState.data.approver_id &&
                  getAdminCateringBookingState.data.override_status == 0 ? (
                    <span
                      onClick={() => {
                        setOpenOverrideApprovalModal(true);
                      }}
                      className="px-2 py-1 text-[10px] text-white bg-green-700 shadow-md lg:mb-0 ml-2 cursor-pointer"
                    >
                      Click to check date to approve
                    </span>
                  ) : getAdminCateringBookingState.data.override_id == null ? (
                    <span
                      onClick={() => {
                        setOpenOverrideDateModal(true);
                      }}
                      className="px-2 py-1 text-[10px] text-white bg-orange-700 shadow-md lg:mb-0 ml-2 cursor-pointer"
                    >
                      Override
                    </span>
                  ) : getAdminCateringBookingState.data.override_status == 0 ? (
                    <span
                      onClick={() => {
                        setOpenOverrideApprovalModal(true);
                      }}
                      className="px-2 py-1 text-[10px] text-white bg-yellow-700 shadow-md lg:mb-0 ml-2 cursor-pointer"
                    >
                      Pending Approval
                    </span>
                  ) : null}
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
                        parseInt(getAdminCateringBookingState.data.end_datetime)
                      )}
                    </Moment>
                  </span>
                </div>
                <div>
                  <strong>Serving Time:</strong>{" "}
                  <span className="font-semibold">
                    <Moment format="LT">
                      {moment.unix(
                        parseInt(getAdminCateringBookingState.data.serving_time)
                      )}
                    </Moment>
                  </span>
                </div>
              </div>
              <div>
                <div className="mt-1">
                  <strong>Type of Function: </strong>
                  <span className="font-semibold">
                    {getAdminCateringBookingState.data?.event_class ?? "N/A"}
                  </span>
                </div>
                <div className="mt-1">
                  <strong>Company Name: </strong>
                  <span className="font-semibold">
                    {getAdminCateringBookingState.data?.company_name ?? "N/A"}
                  </span>
                </div>
                <div className="mt-1">
                  <strong>Special Arrangements: </strong>
                  <span className="font-semibold">
                    {getAdminCateringBookingState.data?.message ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <hr />

        {getAdminCateringBookingState.data ? (
          <div className="pt-2 pb-3">
            <span className="text-xl font-bold">Attached Documents</span>

            {getAdminCateringBookingState.data.initial_payment_proof ? (
              <div>
                <strong>Proof of initial payment:</strong>{" "}
                <span className="font-semibold">
                  <a
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                    href={`${REACT_APP_DOMAIN_URL}api/load-image-catering/${getAdminCateringBookingState.data.initial_payment_proof}`}
                  >
                    Click to view
                  </a>
                </span>
              </div>
            ) : null}
            {getAdminCateringBookingState.data.final_payment_proof ? (
              <div>
                <strong>Proof of final payment:</strong>{" "}
                <span className="font-semibold">
                  <a
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                    href={`${REACT_APP_DOMAIN_URL}api/load-image-catering/${getAdminCateringBookingState.data.final_payment_proof}`}
                  >
                    Click to view
                  </a>
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        <hr />

        <div className="pt-2 ">
          <span className="text-xl font-bold">Order Details</span>

          {getAdminCateringBookingState.data ? (
            <>
              <table className="hidden w-full mt-3 text-sm text-left rounded-lg lg:table customer-information-table">
                <thead className="text-xs text-white uppercase bg-secondary ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Remarks
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getAdminCateringBookingState.data.items.map((item, i) => (
                    <tr key={i}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-secondary "
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              item.product_label +
                              " " +
                              item.name +
                              (item.add_details
                                ? " , " + item.add_details
                                : ""),
                          }}
                        />
                      </th>
                      <td className="px-6 align-top w-[250px] ">
                        <AdminCateringEditFlavor orderItem={item} />
                      </td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4 text-end">
                        <NumberFormat
                          value={parseInt(item.product_price).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </td>
                      <td className="px-6 py-4 text-end">
                        <NumberFormat
                          value={(
                            parseInt(item.product_price) * item.quantity
                          ).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="text-end ">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Total:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      +
                      <NumberFormat
                        value={parseInt(
                          getAdminCateringBookingState.data.purchase_amount
                        ).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Subtotal:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      +
                      <NumberFormat
                        value={parseInt(
                          getAdminCateringBookingState.data.purchase_amount
                        ).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </td>
                  </tr>

                  {getAdminCateringBookingState.data.discount &&
                  getAdminCateringBookingState.data.discount_percentage &&
                  getAdminCateringBookingState.data.discount_name ? (
                    <tr className="text-end">
                      <td colSpan={4} className="px-6 py-2 font-bold ">
                        {parseFloat(
                          getAdminCateringBookingState.data.discount_percentage
                        ) * 100}
                        % {getAdminCateringBookingState.data.discount_name}
                      </td>
                      <td className="px-6 py-2 w-[150px]">
                        -{" "}
                        {calculateWithZeroIfNoValue(
                          getAdminCateringBookingState.data.discount
                        )}
                      </td>
                    </tr>
                  ) : null}

                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Service Fee:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      +
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.service_fee.toString()
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Transportation Fee:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      +
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.distance_price
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Additional Hour Charges:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      +
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.additional_hour_charge.toString()
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Night differential Charge:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      +
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.night_diff_fee.toString()
                      )}
                    </td>
                  </tr>

                  {getAdminCateringBookingState.data.cod_fee &&
                  getAdminCateringBookingState.data.cod_fee !== "0" ? (
                    <tr className="text-end">
                      <td colSpan={4} className="px-6 py-2 font-bold">
                        COD Additional Charges:
                      </td>
                      <td className="px-6 py-2">
                        +{" "}
                        {calculateWithZeroIfNoValue(
                          getAdminCateringBookingState.data.cod_fee
                        )}
                      </td>
                    </tr>
                  ) : null}

                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Grand Total:
                    </td>
                    <td className="px-6 py-2 w-[150px]">
                      {calculateGrandTotal()}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="lg:hidden">
                {getAdminCateringBookingState.data.items.map((item, i) => (
                  <div className="py-2 border-b">
                    <p className="mb-2 text-xs leading-1 text-semibold">
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            item.product_label +
                            " " +
                            item.name +
                            (item.add_details ? " , " + item.add_details : ""),
                        }}
                      />
                    </p>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Remarks:</span>
                      <span className="text-xs">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.remarks ?? "",
                          }}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Quantity:</span>
                      <span className="text-xs">{item.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Price:</span>
                      <span className="text-xs">
                        <NumberFormat
                          value={parseInt(item.product_price).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Total:</span>
                      <span className="text-xs">
                        <NumberFormat
                          value={(
                            parseInt(item.product_price) * item.quantity
                          ).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-2">
                  <span className="text-sm font-bold">Total: </span>
                  <span className="text-sm text-end">
                    +
                    <NumberFormat
                      value={parseInt(
                        getAdminCateringBookingState.data.purchase_amount
                      ).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Subtotal:</span>
                  <span className="text-sm text-end">
                    +
                    <NumberFormat
                      value={parseInt(
                        getAdminCateringBookingState.data.purchase_amount
                      ).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </span>
                </div>

                {getAdminCateringBookingState.data.discount &&
                getAdminCateringBookingState.data.discount_percentage &&
                getAdminCateringBookingState.data.discount_name ? (
                  <div className="flex justify-between">
                    <span className="text-sm font-bold">
                      {parseFloat(
                        getAdminCateringBookingState.data.discount_percentage
                      ) * 100}
                      % {getAdminCateringBookingState.data.discount_name}:
                    </span>
                    <span className="text-sm text-end">
                      -{" "}
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.discount
                      )}
                    </span>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Service Fee:</span>
                  <span className="text-sm text-end">
                    +
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.service_fee.toString()
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Transportation Fee:</span>
                  <span className="text-sm text-end">
                    +
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.distance_price
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">
                    Additional Hour Charge:
                  </span>
                  <span className="text-sm text-end">
                    +
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.additional_hour_charge.toString()
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">
                    Night differential Charge:
                  </span>
                  <span className="text-sm text-end">
                    +
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.night_diff_fee.toString()
                    )}
                  </span>
                </div>
                {getAdminCateringBookingState.data.cod_fee &&
                getAdminCateringBookingState.data.cod_fee !== "0" ? (
                  <div className="flex justify-between">
                    <span className="text-sm font-bold">
                      COD Additional Charges:
                    </span>
                    <span className="text-sm text-end">
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.cod_fee
                      )}
                    </span>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Grand Total:</span>
                  <span className="text-sm text-end">
                    {calculateGrandTotal()}
                  </span>
                </div>
              </div>
            </>
          ) : null}

          <div className="flex flex-col items-start justify-between py-3 lg:flex-row">
            <div className="order-2 space-x-2 lg:order-1">
              <a
                href={`${REACT_APP_DOMAIN_URL}api/download/contract/${getAdminCateringBookingState.data?.hash_key}`}
                className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md"
              >
                Download Original Contract
              </a>
              {getAdminCateringBookingState.data &&
              getAdminCateringBookingState.data.uploaded_contract ? (
                <a
                  className="px-3 py-1 text-base text-white bg-blue-700 rounded-md shadow-md"
                  target="_blank"
                  rel="noreferrer"
                  href={`${REACT_APP_DOMAIN_URL}api/load-image-catering-contract/${getAdminCateringBookingState.data?.uploaded_contract}`}
                >
                  Download Signed Contract
                </a>
              ) : null}
            </div>
            <div className="order-1 space-x-2 lg:order-2">
              <AdminCateringBookingCustomerInformationButtons />
            </div>
          </div>
        </div>
      </div>

      <AdminPasswordModal
        open={openAdminPasswordStatusChangeModal}
        onEnterPassword={(password: string) => {
          if (getAdminCateringBookingState.data)
            dispatch(
              adminCateringPrivilege({
                password,
                fbUserId: getAdminCateringBookingState.data.fb_user_id,
                mobileUserId: getAdminCateringBookingState.data.mobile_user_id,
                transactionId: getAdminCateringBookingState.data.id,
                transactionHash: getAdminCateringBookingState.data.hash_key,
                fromStatusId: getAdminCateringBookingState.data.status,
                toStatusId: status,
              })
            );
        }}
        onClose={() => {
          setOpenAdminPasswordStatusChangeModal(false);
        }}
      />

      <AdminPasswordModal
        open={openAdminPasswordStoreChangeModal}
        onEnterPassword={(password: string) => {
          if (getAdminCateringBookingState.data)
            dispatch(
              adminCateringPrivilege({
                password,
                fbUserId: getAdminCateringBookingState.data.fb_user_id,
                mobileUserId: getAdminCateringBookingState.data.mobile_user_id,
                transactionId: getAdminCateringBookingState.data.id,
                transactionHash: getAdminCateringBookingState.data.hash_key,
                fromStoreId: getAdminCateringBookingState.data.store,
                toStoreId: store,
              })
            );
        }}
        onClose={() => {
          setOpenAdminPasswordStoreChangeModal(false);
        }}
      />
      <AdminOverrideDateModal
        open={openOverrideDateModal}
        title="Override Event Datetime"
        onClickOverride={(startDate, endDate) => {
          if (getAdminCateringBookingState.data) {
            dispatch(
              adminCateringBookingOverrideEventDate({
                transactionId: getAdminCateringBookingState.data.id,
                startDate: startDate,
                endDate: endDate,
                storeId: getAdminCateringBookingState.data.store,
              })
            );
          }

          setOpenOverrideDateModal(false);
        }}
        onClose={() => {
          setOpenOverrideDateModal(false);
        }}
      />
      <AdminOverrideApprovalModal
        open={openOverrideApprovalModal}
        title="Pending Approval"
        onClose={() => {
          setOpenOverrideApprovalModal(false);
        }}
      />
    </>
  );
}
