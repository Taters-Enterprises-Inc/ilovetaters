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
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormEvent, useEffect, useState } from "react";
import {
  selectGetAdminStores,
  getAdminStores,
} from "../slices/get-admin-stores.slice";
import { AdminPasswordModal } from "../modals";
import {
  adminCateringPrivilege,
  AdminCateringPrivilegeState,
  selectAdminCateringPrivilege,
  resetAdminCateringPrivilege,
} from "../slices/admin-catering-privilege.slice";
import { AdminCateringBookingCustomerInformationButtons } from "./admin-catering-booking-customer-information-buttons";
import {
  getAdminCateringBooking,
  selectGetAdminCateringBooking,
} from "../slices/get-admin-catering-booking.slice";
import Moment from "react-moment";
import moment from "moment";

export function AdminCateringBookingCustomerInformation() {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const [openAdminPasswordModal, setOpenAdminPasswordModal] = useState<{
    status: boolean;
    formData?: FormData;
  }>({
    status: false,
  });

  const trackingNo = query.get("tracking_no");

  const getAdminCateringBookingState = useAppSelector(
    selectGetAdminCateringBooking
  );
  const getAdminStoresState = useAppSelector(selectGetAdminStores);

  const adminCateringPrivilegeState = useAppSelector(
    selectAdminCateringPrivilege
  );

  useEffect(() => {
    if (
      adminCateringPrivilegeState.status === AdminCateringPrivilegeState.success
    ) {
      dispatch(resetAdminCateringPrivilege());
      setOpenAdminPasswordModal({ status: false });
    }
  }, [adminCateringPrivilegeState, dispatch]);

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminCateringBooking(trackingNo));
    }
  }, [dispatch, trackingNo, adminCateringPrivilegeState]);

  useEffect(() => {
    dispatch(getAdminStores());
  }, [dispatch]);

  const calculateWithZeroIfNoValue = (value: number) => {
    if (value)
      return (
        <NumberFormat
          value={value.toFixed(2)}
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
    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  const handleOnSubmitAdminCateringPrivilege = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    setOpenAdminPasswordModal({
      status: true,
      formData,
    });
  };

  return (
    <div>
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
            <form
              onSubmit={handleOnSubmitAdminCateringPrivilege}
              className="flex flex-col flex-1 lg:flex-row"
            >
              <input
                readOnly
                hidden
                name="trans_id"
                value={getAdminCateringBookingState.data?.id}
              />
              <input
                readOnly
                hidden
                name="from_status_id"
                value={getAdminCateringBookingState.data?.status}
              />
              <Select
                size="small"
                name="to_status_id"
                defaultValue={getAdminCateringBookingState.data?.status}
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
              </Select>
              <button
                type="submit"
                className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0"
              >
                Change Booking Status
              </button>
            </form>
          </div>

          <hr />

          <form
            onSubmit={handleOnSubmitAdminCateringPrivilege}
            className="flex flex-col flex-1 lg:flex-row"
          >
            <input
              readOnly
              hidden
              name="trans_id"
              value={getAdminCateringBookingState.data?.id}
            />

            <input
              readOnly
              hidden
              name="from_store_id"
              value={getAdminCateringBookingState.data?.store}
            />

            <Select
              size="small"
              defaultValue={getAdminCateringBookingState.data?.store}
              name="to_store_id"
            >
              {getAdminStoresState.data?.map((store, index) => (
                <MenuItem key={index} value={store.store_id}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
            <button
              type="submit"
              className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0"
            >
              Transfer to Store
            </button>
          </form>
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

            {getAdminCateringBookingState.data.uploaded_contract ? (
              <div className="mt-1">
                <strong>Uploaded Signed Contract:</strong>{" "}
                <span className="font-semibold">
                  <a
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                    href={`${REACT_APP_DOMAIN_URL}api/load-image-catering-contract/${getAdminCateringBookingState.data?.uploaded_contract}`}
                  >
                    Click to view
                  </a>
                </span>
              </div>
            ) : null}
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
                        className="px-6 py-4 font-medium text-secondary"
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
                      <td className="px-6 py-4">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.remarks,
                          }}
                        />
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
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Total:
                    </td>
                    <td className="px-6 py-2">
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
                    <td className="px-6 py-2">
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
                      Service Fee:
                    </td>
                    <td className="px-6 py-2">
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.service_fee
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Transportation Fee:
                    </td>
                    <td className="px-6 py-2">
                      {calculateWithZeroIfNoValue(
                        parseInt(
                          getAdminCateringBookingState.data.distance_price
                        )
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Additional Hour Charges:
                    </td>
                    <td className="px-6 py-2">
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.additional_hour_charge
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Night differential Charge:
                    </td>
                    <td className="px-6 py-2">
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.night_diff_fee
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Grand Total:
                    </td>
                    <td className="px-6 py-2">{calculateGrandTotal()}</td>
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
                            __html: item.remarks,
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
                  <span className="text-sm font-bold">Service Fee:</span>
                  <span className="text-sm text-end">
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.service_fee
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Transportation Fee:</span>
                  <span className="text-sm text-end">
                    {calculateWithZeroIfNoValue(
                      parseInt(getAdminCateringBookingState.data.distance_price)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">
                    Additional Hour Charge:
                  </span>
                  <span className="text-sm text-end">
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.additional_hour_charge
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">
                    Night differential Charge:
                  </span>
                  <span className="text-sm text-end">
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.night_diff_fee
                    )}
                  </span>
                </div>
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
                Download Catering Contract
              </a>
            </div>
            <div className="order-1 space-x-2 lg:order-2">
              <AdminCateringBookingCustomerInformationButtons />
            </div>
          </div>
        </div>
      </div>

      <AdminPasswordModal
        open={openAdminPasswordModal.status}
        onEnterPassword={(password: string) => {
          if (openAdminPasswordModal.formData) {
            openAdminPasswordModal.formData.append("password", password);
            dispatch(adminCateringPrivilege(openAdminPasswordModal.formData));
          }
        }}
        onClose={() => {
          setOpenAdminPasswordModal({
            status: false,
          });
        }}
      />
    </div>
  );
}
