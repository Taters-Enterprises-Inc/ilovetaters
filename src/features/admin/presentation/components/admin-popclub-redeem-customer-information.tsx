import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getAdminPopclubRedeem,
  selectGetAdminPopclubRedeem,
} from "../slices/get-admin-popclub-redeem.slice";
import { ADMIN_POPCLUB_REDEEM_STATUS } from "features/shared/constants";
import moment from "moment";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import {
  adminCompleteRedeem,
  AdminCompleteRedeemState,
  resetAdminCompleteRedeemSliceStatus,
  selectAdminCompleteRedeem,
} from "../slices/admin-complete-redeem.slice";
import { useEffect, useState } from "react";
import {
  adminDeclineRedeem,
  AdminDeclineRedeemState,
  resetAdminDeclineRedeemSliceStatus,
  selectAdminDeclineRedeem,
} from "../slices/admin-decline-redeem.slice";
import { MaterialInput } from "features/shared/presentation/components";
import {
  selectValidatePartnerCompanyEmployeeIdNumberAdmin,
  validatePartnerCompanyEmployeeIdNumberAdmin,
} from "../slices/validate-partner-company-employee-id-number.slice";

interface AdminPopclubRedeemCustomerInformationProps {
  onClose: () => void;
}
export function AdminPopclubRedeemCustomerInformation(
  props: AdminPopclubRedeemCustomerInformationProps
) {
  const query = useQuery();

  const redeemCode = query.get("redeem_code");

  const dispatch = useAppDispatch();
  const adminCompleteRedeemState = useAppSelector(selectAdminCompleteRedeem);
  const adminDeclineRedeemState = useAppSelector(selectAdminDeclineRedeem);
  const getAdminPopclubRedeemState = useAppSelector(
    selectGetAdminPopclubRedeem
  );
  const validatePartnerCompanyEmployeeIdNumberAdminState = useAppSelector(
    selectValidatePartnerCompanyEmployeeIdNumberAdmin
  );

  const [idNumber, setIdNumber] = useState<string>("");

  useEffect(() => {
    if (adminDeclineRedeemState.status === AdminDeclineRedeemState.success) {
      dispatch(resetAdminDeclineRedeemSliceStatus());
      props.onClose();
    }
  }, [adminDeclineRedeemState, dispatch]);

  useEffect(() => {
    if (adminCompleteRedeemState.status === AdminCompleteRedeemState.success) {
      dispatch(resetAdminCompleteRedeemSliceStatus());
      props.onClose();
    }
  }, [adminCompleteRedeemState, dispatch]);

  useEffect(() => {
    if (redeemCode) {
      dispatch(getAdminPopclubRedeem(redeemCode));
    }
  }, [redeemCode, validatePartnerCompanyEmployeeIdNumberAdminState, dispatch]);

  const handleComplete = () => {
    if (getAdminPopclubRedeemState.data) {
      dispatch(
        adminCompleteRedeem({
          redeemId: getAdminPopclubRedeemState.data.id,
          fbUserId: getAdminPopclubRedeemState.data.fb_user_id,
          mobileUserId: getAdminPopclubRedeemState.data.mobile_user_id,
        })
      );
    }
  };

  const handleDecline = () => {
    if (getAdminPopclubRedeemState.data) {
      dispatch(
        adminDeclineRedeem({
          redeemId: getAdminPopclubRedeemState.data.id,
          fbUserId: getAdminPopclubRedeemState.data.fb_user_id,
          mobileUserId: getAdminPopclubRedeemState.data.mobile_user_id,
        })
      );
    }
  };

  const calculateGrandTotal = () => {
    let calculatedPrice = 0;

    const items = getAdminPopclubRedeemState.data?.items;

    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.price)
          calculatedPrice += parseFloat(item.price) * item.quantity;
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

  return (
    <div className="pt-1 text-secondary">
      <div className="space-y-1 ">
        <div className="grid-cols-3 gap-4 lg:grid ">
          <div>
            <strong>Redeem Code:</strong>{" "}
            <span className="font-semibold">
              {getAdminPopclubRedeemState.data?.redeem_code ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Redeem Status:</strong>{" "}
            {getAdminPopclubRedeemState.data ? (
              <>
                {getAdminPopclubRedeemState.data.status === 1 &&
                moment(getAdminPopclubRedeemState.data.expiration).isBefore(
                  moment()
                ) ? (
                  <span
                    className="px-2 py-1 text-xs rounded-full "
                    style={{
                      color: "white",
                      backgroundColor: "#a21013",
                    }}
                  >
                    Expired
                  </span>
                ) : (
                  <span
                    className="px-2 py-1 text-xs rounded-full "
                    style={{
                      color: "white",
                      backgroundColor:
                        ADMIN_POPCLUB_REDEEM_STATUS[
                          getAdminPopclubRedeemState.data.status
                        ].color,
                    }}
                  >
                    {
                      ADMIN_POPCLUB_REDEEM_STATUS[
                        getAdminPopclubRedeemState.data.status
                      ].name
                    }
                  </span>
                )}
              </>
            ) : null}
          </div>
        </div>

        <hr />

        <div className="grid-cols-3 gap-4 lg:grid">
          <div>
            <strong>Full Name:</strong>{" "}
            <span className="font-semibold">
              {getAdminPopclubRedeemState.data?.client_name ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Contact Number:</strong>{" "}
            <span className="font-semibold">
              {getAdminPopclubRedeemState.data?.contact_number ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Email:</strong>{" "}
            <span className="font-semibold">
              {getAdminPopclubRedeemState.data?.email ?? "N/A"}
            </span>
          </div>
        </div>

        <hr />

        <div className="grid-cols-2 gap-4 lg:grid">
          <div>
            <strong>Order Date:</strong>{" "}
            <span className="font-semibold">
              <Moment format="LLL">
                {getAdminPopclubRedeemState.data?.dateadded}
              </Moment>
            </span>
          </div>
          <div>
            <strong>Expiration Date:</strong>{" "}
            <span className="font-semibold">
              <Moment format="LLL">
                {getAdminPopclubRedeemState.data?.expiration}
              </Moment>
            </span>
          </div>
        </div>

        {getAdminPopclubRedeemState.data?.items.some(
          (value) => value.is_partner_company
        ) ? (
          <>
            <hr />
            <div className="flex flex-col py-2 space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
              {getAdminPopclubRedeemState.data.partner_company_id_number ===
              null ? (
                <div className="flex flex-col flex-1 lg:flex-row lg:space-x-2">
                  <MaterialInput
                    colorTheme="black"
                    size="small"
                    label="Employee ID Number"
                    name="idNumber"
                    value={idNumber}
                    onChange={(e) => {
                      setIdNumber(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      if (getAdminPopclubRedeemState.data)
                        dispatch(
                          validatePartnerCompanyEmployeeIdNumberAdmin({
                            redeemId: getAdminPopclubRedeemState.data.id,
                            idNumber,
                          })
                        );
                    }}
                    className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0"
                  >
                    Validate
                  </button>
                </div>
              ) : (
                <div className="flex items-start justify-start flex-1 space-x-2">
                  <strong>Employee ID Number: </strong>
                  <span>
                    {getAdminPopclubRedeemState.data.partner_company_id_number}
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
            </div>
          </>
        ) : null}
      </div>

      <hr className="mt-1" />

      <div className="pt-2 pb-4 ">
        <span className="text-xl font-bold">Redeem Details</span>

        {getAdminPopclubRedeemState.data ? (
          <>
            <table className="hidden w-full mt-3 text-sm text-left rounded-lg lg:table">
              <thead className="text-xs text-white uppercase bg-secondary ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
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
                {getAdminPopclubRedeemState.data.items.map((item) => (
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-medium text-secondary">
                      <span className="font-bold">{item.alias}</span>
                      <br />
                      {item.remarks ? (
                        <>
                          <span
                            className="text-secondary"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                          <br />
                          <br />

                          <span className=" text-secondary font-bold">
                            Flavors:
                          </span>

                          <br />

                          <span
                            className="text-secondary"
                            dangerouslySetInnerHTML={{
                              __html: item.remarks,
                            }}
                          />
                        </>
                      ) : (
                        <span
                          className="text-secondary"
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">
                      {item.price ? (
                        <NumberFormat
                          value={parseFloat(item.price).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      ) : (
                        "₱0.00"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.price ? (
                        <NumberFormat
                          value={(
                            parseFloat(item.price) * item.quantity
                          ).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      ) : (
                        "₱0.00"
                      )}
                    </td>
                  </tr>
                ))}

                <tr className="bg-gray-200">
                  <td colSpan={3} className="px-6 py-2 font-bold text-end">
                    Grand Total:
                  </td>
                  <td className="px-6 py-2">{calculateGrandTotal()}</td>
                </tr>
              </tbody>
            </table>

            <div className="lg:hidden">
              {getAdminPopclubRedeemState.data.items.map((item) => (
                <div className="lg:hidden">
                  <div className="py-2 border-b">
                    <p className="mb-2 text-xs leading-1 text-semibold">
                      <span className="font-bold">{item.alias}</span>
                      <br />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.remarks,
                        }}
                      />
                    </p>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Quantity:</span>
                      <span className="text-xs">{item.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Price:</span>
                      <span className="text-xs">
                        {item.price ? (
                          <NumberFormat
                            value={parseFloat(item.price).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        ) : (
                          "₱0.00"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Total:</span>
                      <span className="text-xs">
                        {item.price ? (
                          <NumberFormat
                            value={(
                              parseFloat(item.price) * item.quantity
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        ) : (
                          "₱0.00"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-sm font-bold">Grand Total:</span>
                <span className="text-sm text-end">
                  {calculateGrandTotal()}
                </span>
              </div>
            </div>
          </>
        ) : null}
        {getAdminPopclubRedeemState.data?.items.some(
          (value) => value.is_partner_company
        ) &&
        getAdminPopclubRedeemState.data &&
        getAdminPopclubRedeemState.data.status === 1 &&
        moment(getAdminPopclubRedeemState.data.expiration).isAfter(moment()) ? (
          <>
            {getAdminPopclubRedeemState.data.partner_company_id_number ? (
              <div className="flex items-start justify-end py-3 space-x-2">
                <button
                  onClick={handleDecline}
                  className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md"
                >
                  Decline
                </button>
                <button
                  onClick={handleComplete}
                  className="order-1 px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:order-2 lg:mb-0"
                >
                  Complete
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-end py-3 space-x-2">
                <button
                  onClick={handleDecline}
                  className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md"
                >
                  Decline
                </button>
                <button
                  disabled
                  style={{ opacity: 0.65 }}
                  className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md cursor-not-allowed lg:mb-0"
                >
                  Complete
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {getAdminPopclubRedeemState.data &&
            getAdminPopclubRedeemState.data.status === 1 &&
            moment(getAdminPopclubRedeemState.data.expiration).isAfter(
              moment()
            ) ? (
              <div className="flex items-start justify-end py-3 space-x-2">
                <button
                  onClick={handleDecline}
                  className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md"
                >
                  Decline
                </button>
                <button
                  onClick={handleComplete}
                  className="order-1 px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:order-2 lg:mb-0"
                >
                  Complete
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
