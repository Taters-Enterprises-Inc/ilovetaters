import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect } from "react";
import NumberFormat from "react-number-format";
import { Link, useParams } from "react-router-dom";
import {
  getCateringOrders,
  selectGetCateringOrders,
} from "../slices/get-catering-orders.slice";
import { CateringContractViewer } from "./catering-contract-viewer";

export function CateringSignedContractVerified() {
  const dispatch = useAppDispatch();
  const { hash } = useParams();
  const getCateringOrdersState = useAppSelector(selectGetCateringOrders);

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getCateringOrders({ hash }));
    }
  }, [dispatch, hash]);

  return (
    <div className="container flex flex-col justify-between space-y-4 lg:flex-row lg:py-16">
      <div className="lg:flex-[0_0_57%] lg:max-w-[57%] order-2 lg:order-1 lg:mt-0 mt-4">
        <div
          className="flex-col justify-between flex-1 hidden px-4 py-3 mb-4 text-green-900 bg-green-100 border-t-4 border-green-500 rounded-b shadow-md lg:flex lg:items-start lg:flex-row"
          role="alert"
        >
          <div className="relative flex">
            <div className="py-1">
              <svg
                className="w-6 h-6 mr-4 text-green-500 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="m-0 font-bold">Signed contract verified</p>
              <p className="text-xs">
                We successfully verify your contract, you can proceed to payment
                now.{" "}
              </p>
            </div>
          </div>

          <Link
            to={`/shop/order/${hash}`}
            className="px-4 py-2 mt-2 text-sm text-center text-white border rounded-lg bg-button border-secondary lg:mt-0"
          >
            Proceed to payment
          </Link>
        </div>
        <CateringContractViewer />
      </div>
      {getCateringOrdersState.data &&
      getCateringOrdersState.data.package_selection ? (
        <div className="lg:flex-[0_0_40%] lg:max-w-[40%] order-1 space-y-4  lg:order-2">
          <div
            className="flex flex-col justify-between flex-1 px-4 py-3 mb-4 text-green-900 bg-green-100 border-t-4 border-green-500 rounded-b shadow-md lg:hidden lg:items-start lg:flex-row"
            role="alert"
          >
            <div className="relative flex">
              <div className="py-1">
                <svg
                  className="w-6 h-6 mr-4 text-green-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="m-0 font-bold">Signed contract verified</p>
                <p className="text-xs">
                  We successfully verify your contract, you can proceed to
                  payment now.{" "}
                </p>
              </div>
            </div>

            <Link
              to={`/shop/order/${hash}`}
              className="px-4 py-2 mt-2 text-sm text-center text-white border rounded-lg bg-button border-secondary lg:mt-0"
            >
              Proceed to payment
            </Link>
          </div>
          <h2 className="font-['Bebas_Neue'] text-3xl  text-secondary tracking-[3px] text-center">
            Order Summary
          </h2>

          <div className="max-h-[400px] overflow-y-auto space-y-4 px-[4px] py-[10px]">
            {getCateringOrdersState.data.package_selection.map((order, i) => (
              <div
                key={i}
                className="flex bg-secondary shadow-md rounded-[10px]"
              >
                <img
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${order.product_image}`}
                  className="rounded-[10px] w-[92px] h-[92px]"
                  alt=""
                />
                <div className="flex flex-col flex-1 px-3 py-2 text-white">
                  <h3 className="text-sm w-[90%]">{order.name}</h3>
                  <h3 className="text-xs">
                    Quantity:{" "}
                    <span className="text-tertiary">{order.quantity}</span>
                  </h3>

                  <h3 className="text-xs">
                    Flavor: <br />
                    <span
                      className="text-tertiary"
                      dangerouslySetInnerHTML={{
                        __html: order.remarks,
                      }}
                    />
                  </h3>

                  <h3 className="flex items-end justify-end flex-1 text-base">
                    {parseInt(order.calc_price) > 0 ? (
                      <NumberFormat
                        value={parseInt(order.calc_price).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    ) : (
                      <span className="font-bold text-tertiary">FREE</span>
                    )}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <hr className="mt-1 mb-2" />
          <div className="grid grid-cols-2 text-secondary">
            <span>Subtotal:</span>
            <span className="text-end">
              +
              <NumberFormat
                value={parseInt(
                  getCateringOrdersState.data.order.clients_info.purchase_amount
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </span>
            {getCateringOrdersState.data.service_fee ? (
              <>
                <span>10% Service Charge:</span>
                <span className="text-end">
                  +
                  <NumberFormat
                    value={getCateringOrdersState.data.service_fee.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                  />
                </span>
              </>
            ) : null}
            <span>Transportation Fee:</span>
            <span className="text-end">
              +
              <NumberFormat
                value={parseInt(
                  getCateringOrdersState.data.transportation_fee
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </span>
            <span>Additional Hour Fee:</span>
            <span className="text-end">
              +
              <NumberFormat
                value={parseInt(
                  getCateringOrdersState.data.additional_hour_fee
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </span>
            <span>Night Differential Fee:</span>
            <span className="text-end">
              +
              <NumberFormat
                value={getCateringOrdersState.data.night_diff_charge.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </span>

            {getCateringOrdersState.data.order.clients_info.discount &&
            getCateringOrdersState.data.order.clients_info.discount_name &&
            getCateringOrdersState.data.order.clients_info
              .discount_percentage ? (
              <>
                <span>
                  {parseFloat(
                    getCateringOrdersState.data?.order.clients_info
                      .discount_percentage
                  ) * 100}
                  %{" "}
                  {getCateringOrdersState.data.order.clients_info.discount_name}
                </span>
                <span className="text-end">
                  -{" "}
                  <NumberFormat
                    value={parseInt(
                      getCateringOrdersState.data.order.clients_info.discount
                    ).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                  />
                </span>
              </>
            ) : null}
          </div>

          <h1 className="text-4xl text-center text-secondary">
            <NumberFormat
              value={getCateringOrdersState.data.grand_total.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₱"}
            />
          </h1>
        </div>
      ) : null}
    </div>
  );
}
