import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  ADMIN_SNACKSHOP_MOP_STATUS,
  ADMIN_CATERING_BOOKING_STATUS,
  CATERING_BOOKING_STATUS,
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
import {
  selectUploadProofOfPaymentAdmin,
  uploadProofOfPaymentAdmin,
} from "../slices/upload-proof-of-payment-admin.slice";
import {
  selectValidateReferenceNumberAdmin,
  validateReferenceNumberAdmin,
} from "../slices/validate-reference-number.slice";
import { AdminPasswordModal } from "../modals";
import {
  adminPrivilege,
  AdminPrivilegeState,
  selectAdminPrivilege,
  resetAdminPrivilege,
} from "../slices/admin-privilege.slice";
import { AdminCateringBookingCustomerInformationButtons } from "./admin-catering-booking-customer-information-buttons";
import {
  getAdminCateringBooking,
  selectGetAdminCateringBooking,
} from "../slices/get-admin-catering-booking.slice";

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

  const uploadProofOfPaymentAdminState = useAppSelector(
    selectUploadProofOfPaymentAdmin
  );
  const validateReferenceNumberAdminState = useAppSelector(
    selectValidateReferenceNumberAdmin
  );

  const adminPrivilegeState = useAppSelector(selectAdminPrivilege);

  useEffect(() => {
    if (adminPrivilegeState.status === AdminPrivilegeState.success) {
      dispatch(resetAdminPrivilege());
      setOpenAdminPasswordModal({ status: false });
    }
  }, [adminPrivilegeState, dispatch]);

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminCateringBooking(trackingNo));
    }
  }, [
    dispatch,
    trackingNo,
    uploadProofOfPaymentAdminState,
    validateReferenceNumberAdminState,
    adminPrivilegeState,
  ]);

  useEffect(() => {
    dispatch(getAdminStores());
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

  const calculateSubTotal = () => {
    let calculatedPrice = 0;

    const orders = getAdminCateringBookingState.data?.items;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice +=
          parseInt(orders[i].product_price) * orders[i].quantity;
      }
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

  const calculateOrderTotal = () => {
    let calculatedPrice = 0;

    const orders = getAdminCateringBookingState.data?.items;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice +=
          parseInt(orders[i].product_price) * orders[i].quantity;
      }
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

  const calculateGrandTotal = () => {
    let calculatedPrice = 0;

    const orders = getAdminCateringBookingState.data?.items;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice +=
          parseInt(orders[i].product_price) * orders[i].quantity;
      }
    }

    if (getAdminCateringBookingState.data?.distance_price) {
      calculatedPrice += parseInt(
        getAdminCateringBookingState.data?.distance_price
      );
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

  const handleOnSubmitPayment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    dispatch(uploadProofOfPaymentAdmin(formData));
  };

  const handleOnSubmitValidateReferenceNumber = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    dispatch(validateReferenceNumberAdmin(formData));
  };

  const handleOnSubmitAdminPrivilege = (e: FormEvent<HTMLFormElement>) => {
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
            <div>
              <strong>Payment Status:</strong>{" "}
              {getAdminCateringBookingState.data ? (
                <span
                  className="px-2 py-1 text-xs rounded-full "
                  style={{
                    color: "white",
                    backgroundColor:
                      ADMIN_CATERING_BOOKING_STATUS[
                        getAdminCateringBookingState.data.status
                      ].color,
                  }}
                >
                  {
                    ADMIN_CATERING_BOOKING_STATUS[
                      getAdminCateringBookingState.data.status
                    ].name
                  }
                </span>
              ) : null}
            </div>
            {getAdminCateringBookingState.data ? (
              <div>
                <strong>Mode of Payment:</strong>
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
                {getAdminCateringBookingState.data?.client_name ?? "N/A"}
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
                {getAdminCateringBookingState.data?.email ?? "N/A"}
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

          {/* {getAdminCateringBookingState.data?.payops !== 3 ? (
            <>
              <hr />
              {getAdminCateringBookingState.data?.payment_proof === "" ? (
                <form
                  onSubmit={handleOnSubmitPayment}
                  className="flex flex-col items-center justify-center space-x-2 space-y-2 lg:justify-start lg:space-y-0 lg:flex-row"
                >
                  <strong>Upload Payment:</strong>{" "}
                  <input type="file" name="payment_file" id="payment_file" />
                  <input
                    readOnly
                    hidden
                    name="trans_id"
                    value={getAdminCateringBookingState.data?.id}
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
                  >
                    Upload
                  </button>
                  <span>(You can only upload .jpg and .png)</span>
                </form>
              ) : (
                <div className="flex flex-col space-x-2 lg:flex-row">
                  <strong>Attached Payment File:</strong>
                  <a
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                    href={`${REACT_APP_DOMAIN_URL}api/load-image/${getAdminCateringBookingState.data?.payment_proof}`}
                  >
                    Click to view
                  </a>
                </div>
              )}
            </>
          ) : null} */}

          <hr />

          <div className="flex flex-col py-2 space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
            {getAdminCateringBookingState.data?.payops !== 3 ? (
              <>
                {getAdminCateringBookingState.data?.reference_num === "" ? (
                  <form
                    onSubmit={handleOnSubmitValidateReferenceNumber}
                    className="flex flex-col flex-1 lg:flex-row"
                  >
                    <TextField
                      size="small"
                      label="Payment Ref. No"
                      name="ref_num"
                    />
                    <input
                      readOnly
                      hidden
                      name="trans_id"
                      value={getAdminCateringBookingState.data?.id}
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0"
                    >
                      Validate
                    </button>
                  </form>
                ) : (
                  <div className="flex items-start justify-start flex-1 space-x-2">
                    <strong>Payment Ref. No: </strong>
                    <span>
                      {getAdminCateringBookingState.data?.reference_num}
                    </span>
                    <span
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        color: "white",
                        backgroundColor: "#004d00",
                      }}
                    >
                      Validated
                    </span>
                  </div>
                )}
              </>
            ) : null}
            <form
              onSubmit={handleOnSubmitAdminPrivilege}
              className="flex flex-col flex-1 lg:flex-row"
            >
              <input
                readOnly
                hidden
                name="trans_id"
                value={getAdminCateringBookingState.data?.id}
              />
              <Select
                size="small"
                name="status"
                defaultValue={getAdminCateringBookingState.data?.status}
              >
                {ADMIN_CATERING_BOOKING_STATUS.map((value, index) => {
                  if (index === 0) {
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
                Change Order Status
              </button>
            </form>
          </div>

          <hr />

          <form
            onSubmit={handleOnSubmitAdminPrivilege}
            className="flex flex-col flex-1 lg:flex-row"
          >
            <input
              readOnly
              hidden
              name="trans_id"
              value={getAdminCateringBookingState.data?.id}
            />
            <Select
              size="small"
              defaultValue={getAdminCateringBookingState.data?.store}
              name="store_id"
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
          <span className="text-xl font-bold">Delivery Information</span>
          <div className="mt-1">
            <strong>Address:</strong>{" "}
            <span className="font-semibold">
              {getAdminCateringBookingState.data?.add_address ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Contact Person:</strong>{" "}
            <span className="font-semibold">Rej Benipayo</span>
          </div>
          <div>
            <strong>Contact Number:</strong>{" "}
            <span className="font-semibold">09158642720</span>
          </div>
        </div>

        <hr />

        <div className="pt-2 ">
          <span className="text-xl font-bold">Order Details</span>

          {getAdminCateringBookingState.data ? (
            <>
              <table className="hidden w-full mt-3 text-sm text-left rounded-lg lg:block customer-information-table">
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
                              " , " +
                              item.add_details,
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
                    <td className="px-6 py-2">{calculateOrderTotal()}</td>
                  </tr>
                  {/* <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold ">
                      Code[ ] Voucher Discount:
                    </td>
                    <td className="px-6 py-2">
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.discount
                      )}
                    </td>
                  </tr> */}
                  {/* <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Gift Card No.[ 0 ]:
                    </td>
                    <td className="px-6 py-2">
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.giftcard_discount
                      )}
                    </td>
                  </tr> */}
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Subtotal:
                    </td>
                    <td className="px-6 py-2">{calculateSubTotal()}</td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      Delivery Fee:
                    </td>
                    <td className="px-6 py-2">
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.distance_price
                      )}
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4} className="px-6 py-2 font-bold">
                      COD Additional Charges:
                    </td>
                    <td className="px-6 py-2">
                      {calculateWithZeroIfNoValue(
                        getAdminCateringBookingState.data.cod_fee
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
                            " , " +
                            item.add_details,
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
                    {calculateOrderTotal()}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-sm font-bold">
                    Code[ ] Voucher Discount:
                  </span>
                  <span className="text-sm text-end">
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.discount
                    )}
                  </span>
                </div> */}
                {/* <div className="flex justify-between">
                  <span className="text-sm font-bold">Gift Card No.[ 0 ]:</span>
                  <span className="text-sm text-end">
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.discount
                    )}
                  </span>
                </div> */}
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Subtotal:</span>
                  <span className="text-sm text-end">
                    {calculateSubTotal()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Delivery Fee:</span>
                  <span className="text-sm text-end">
                    {calculateWithZeroIfNoValue(
                      getAdminCateringBookingState.data.distance_price
                    )}
                  </span>
                </div>
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
              <button className="px-3 py-1 text-base text-white bg-blue-700 rounded-md shadow-md">
                Print
              </button>
              <button className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md">
                Download Document
              </button>
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
            dispatch(adminPrivilege(openAdminPasswordModal.formData));
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
