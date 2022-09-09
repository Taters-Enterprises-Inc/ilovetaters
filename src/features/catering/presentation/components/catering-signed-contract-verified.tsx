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

  const calculateSubTotalPrice = () => {
    let calculatedPrice = 0;
    const orders = getCateringOrdersState.data?.order.order_details;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += parseInt(orders[i].calc_price);
      }
      return (
        <NumberFormat
          value={calculatedPrice.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    } else {
      return <>₱0.00</>;
    }
  };

  return (
    <div className="container flex flex-col justify-between space-y-4 lg:flex-row ">
      <div className="lg:flex-[0_0_57%] lg:max-w-[57%] order-2 lg:order-1 lg:mt-0 mt-4">
        <div
          className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4 flex-1 lg:items-start flex justify-between lg:flex-row flex-col"
          role="alert"
        >
          <div className="flex relative">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-green-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold m-0">Signed contract verified</p>
              <p className="text-xs">
                We successfully verify your contract, you can proceed to payment
                now.{" "}
              </p>
            </div>
          </div>

          <Link
            to={`/catering/order/${hash}`}
            className="bg-button text-white text-sm text-center lg:mt-0 mt-2 py-2 px-4 rounded-lg"
          >
            Proceed to payment
          </Link>
        </div>
        <CateringContractViewer />
      </div>
      {getCateringOrdersState.data &&
      getCateringOrdersState.data.order.order_details ? (
        <div className="lg:flex-[0_0_40%] lg:max-w-[40%] order-1 space-y-4  lg:order-2">
          <h2 className="font-['Bebas_Neue'] text-3xl  text-white tracking-[3px] text-center">
            Order Summary
          </h2>

          <div className="max-h-[400px] overflow-y-auto space-y-4 px-[4px] py-[10px]">
            {getCateringOrdersState.data.order.order_details.map((order, i) => (
              <div
                key={i}
                className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px]"
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
          <div className="grid grid-cols-2 text-white">
            <span>Subtotal:</span>
            <span className="text-end">{calculateSubTotalPrice()}</span>
            {getCateringOrdersState.data.service_fee ? (
              <>
                <span>10% Service Charge:</span>
                <span className="text-end">
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
              <NumberFormat
                value={getCateringOrdersState.data.night_diff_charge.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </span>
          </div>

          <h1 className="text-4xl text-center text-white">
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
