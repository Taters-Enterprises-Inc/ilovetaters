import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetAdminPopclubRedeem } from "../slices/get-admin-popclub-redeem.slice";
import { ADMIN_POPCLUB_REDEEM_STATUS } from "features/shared/constants";
import moment from "moment";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import {
  adminCompleteRedeem,
  AdminCompleteRedeemState,
  selectAdminCompleteRedeem,
} from "../slices/admin-complete-redeem.slice";
import { useEffect } from "react";

interface AdminPopclubRedeemCustomerInformationProps {
  onClose: () => void;
}
export function AdminPopclubRedeemCustomerInformation(
  props: AdminPopclubRedeemCustomerInformationProps
) {
  const dispatch = useAppDispatch();
  const adminCompleteRedeemState = useAppSelector(selectAdminCompleteRedeem);
  const getAdminPopclubRedeemState = useAppSelector(
    selectGetAdminPopclubRedeem
  );

  useEffect(() => {
    if (adminCompleteRedeemState.status === AdminCompleteRedeemState.success) {
      props.onClose();
    }
  }, [adminCompleteRedeemState, dispatch]);

  const handleComplete = () => {
    if (getAdminPopclubRedeemState.data) {
      dispatch(
        adminCompleteRedeem(getAdminPopclubRedeemState.data.redeem_code)
      );
    }
  };

  return (
    <div className="pt-1  text-secondary">
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
                    className=" text-xs rounded-full py-1 px-2"
                    style={{
                      color: "white",
                      backgroundColor: "#a21013",
                    }}
                  >
                    Expired
                  </span>
                ) : (
                  <span
                    className=" text-xs rounded-full py-1 px-2"
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
                      <span
                        className="text-secondary"
                        dangerouslySetInnerHTML={{
                          __html: item.remarks,
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">
                      <NumberFormat
                        value={item.price.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <NumberFormat
                        value={(item.price * item.quantity).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </td>
                  </tr>
                ))}

                <tr className="bg-gray-200">
                  <td colSpan={3} className="px-6 py-2 font-bold text-end">
                    Grand Total:
                  </td>
                  <td className="px-6 py-2">₱375.00</td>
                </tr>
              </tbody>
            </table>

            <div className="lg:hidden">
              {getAdminPopclubRedeemState.data.items.map((item) => (
                <div className="lg:hidden">
                  <div className="py-2 border-b">
                    <p className="mb-2 text-xs leading-1 text-semibold">
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
                        <NumberFormat
                          value={item.price.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">Total:</span>
                      <span className="text-xs">₱375.00</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-sm font-bold">Grand Total:</span>
                <span className="text-sm text-end">₱375.00</span>
              </div>
            </div>
          </>
        ) : null}

        {getAdminPopclubRedeemState.data &&
        getAdminPopclubRedeemState.data.status === 1 &&
        moment(getAdminPopclubRedeemState.data.expiration).isAfter(moment()) ? (
          <div className="flex items-start justify-end space-x-2 py-3">
            <button className="px-3 py-1 text-base text-white bg-orange-700 rounded-md shadow-md">
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
      </div>
    </div>
  );
}