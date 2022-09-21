import { useAppSelector } from "features/config/hooks";
import { selectGetAdminShopOrder } from "../slices/get-admin-shop-order.slice";
import {
  ADMIN_SNACKSHOP_ORDER_STATUS,
  ORDER_STATUS,
} from "features/shared/constants";
import NumberFormat from "react-number-format";

export function AdminShopOrderCustomerInformation() {
  const getAdminShopOrderState = useAppSelector(selectGetAdminShopOrder);

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

    const orders = getAdminShopOrderState.data?.items;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice +=
          parseInt(orders[i].product_price) * orders[i].quantity;
      }
    }

    if (getAdminShopOrderState.data?.discount) {
      calculatedPrice -= parseInt(getAdminShopOrderState.data?.discount);
    }

    if (getAdminShopOrderState.data?.reseller_discount) {
      calculatedPrice -= parseInt(
        getAdminShopOrderState.data?.reseller_discount
      );
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

    const orders = getAdminShopOrderState.data?.items;

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

    const orders = getAdminShopOrderState.data?.items;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice +=
          parseInt(orders[i].product_price) * orders[i].quantity;
      }
    }

    if (getAdminShopOrderState.data?.distance_price) {
      calculatedPrice += parseInt(getAdminShopOrderState.data?.distance_price);
    }

    if (getAdminShopOrderState.data?.cod_fee) {
      calculatedPrice += parseInt(getAdminShopOrderState.data?.cod_fee);
    }

    if (getAdminShopOrderState.data?.discount) {
      calculatedPrice -= parseInt(getAdminShopOrderState.data?.discount);
    }

    if (getAdminShopOrderState.data?.giftcard_discount) {
      calculatedPrice -= parseInt(
        getAdminShopOrderState.data?.giftcard_discount
      );
    }

    if (getAdminShopOrderState.data?.reseller_discount) {
      calculatedPrice -= parseInt(
        getAdminShopOrderState.data?.reseller_discount
      );
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
            <strong>Tracking Number:</strong>{" "}
            <span className="font-semibold">
              {getAdminShopOrderState.data?.tracking_no ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Payment Status:</strong>{" "}
            {getAdminShopOrderState.data ? (
              <span
                className="px-2 py-1 text-xs rounded-full "
                style={{
                  color: "white",
                  backgroundColor:
                    ADMIN_SNACKSHOP_ORDER_STATUS[
                      getAdminShopOrderState.data.status
                    ].color,
                }}
              >
                {
                  ADMIN_SNACKSHOP_ORDER_STATUS[
                    getAdminShopOrderState.data.status
                  ].name
                }
              </span>
            ) : null}
          </div>
          <div>
            <strong>Mode of Payment:</strong>{" "}
            <span className="font-semibold">GCASH</span>
          </div>
        </div>

        <hr />

        <div className="grid-cols-3 gap-4 lg:grid">
          <div>
            <strong>Full Name:</strong>{" "}
            <span className="font-semibold">
              {getAdminShopOrderState.data?.client_name ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Contact Number:</strong>{" "}
            <span className="font-semibold">
              {getAdminShopOrderState.data?.contact_number ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Email:</strong>{" "}
            <span className="font-semibold">
              {getAdminShopOrderState.data?.email ?? "N/A"}
            </span>
          </div>
        </div>

        <hr />

        <div>
          <strong>Order Status:</strong>{" "}
          {getAdminShopOrderState.data ? (
            <span
              className="px-2 py-1 text-xs rounded-full "
              style={{
                color: "white",
                backgroundColor:
                  ORDER_STATUS[getAdminShopOrderState.data.status].color,
              }}
            >
              {ORDER_STATUS[getAdminShopOrderState.data.status].name}
            </span>
          ) : null}
        </div>
      </div>

      <hr className="mt-1" />

      <div className="pt-2 pb-3">
        <span className="text-xl font-bold">Delivery Information</span>
        <div className="mt-1">
          <strong>Address:</strong>{" "}
          <span className="font-semibold">
            {getAdminShopOrderState.data?.add_address ?? "N/A"}
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

        {getAdminShopOrderState.data ? (
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
                {getAdminShopOrderState.data.items.map((item, i) => (
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
                <tr className="text-end">
                  <td colSpan={4} className="px-6 py-2 font-bold ">
                    Code[ ] Voucher Discount:
                  </td>
                  <td className="px-6 py-2">
                    {calculateWithZeroIfNoValue(
                      getAdminShopOrderState.data.discount
                    )}
                  </td>
                </tr>
                <tr className="text-end">
                  <td colSpan={4} className="px-6 py-2 font-bold">
                    Gift Card No.[ 0 ]:
                  </td>
                  <td className="px-6 py-2">
                    {calculateWithZeroIfNoValue(
                      getAdminShopOrderState.data.giftcard_discount
                    )}
                  </td>
                </tr>
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
                      getAdminShopOrderState.data.distance_price
                    )}
                  </td>
                </tr>
                <tr className="text-end">
                  <td colSpan={4} className="px-6 py-2 font-bold">
                    COD Additional Charges:
                  </td>
                  <td className="px-6 py-2">
                    {calculateWithZeroIfNoValue(
                      getAdminShopOrderState.data.cod_fee
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
              {getAdminShopOrderState.data.items.map((item, i) => (
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
              <div className="flex justify-between">
                <span className="text-sm font-bold">
                  Code[ ] Voucher Discount:
                </span>
                <span className="text-sm text-end">
                  {calculateWithZeroIfNoValue(
                    getAdminShopOrderState.data.discount
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-bold">Gift Card No.[ 0 ]:</span>
                <span className="text-sm text-end">
                  {calculateWithZeroIfNoValue(
                    getAdminShopOrderState.data.discount
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-bold">Subtotal:</span>
                <span className="text-sm text-end">{calculateSubTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-bold">Delivery Fee:</span>
                <span className="text-sm text-end">
                  {calculateWithZeroIfNoValue(
                    getAdminShopOrderState.data.distance_price
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-bold">
                  COD Additional Charges:
                </span>
                <span className="text-sm text-end">
                  {calculateWithZeroIfNoValue(
                    getAdminShopOrderState.data.cod_fee
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
          <button className="order-1 px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:order-2 lg:mb-0">
            Prepare
          </button>
        </div>
      </div>
    </div>
  );
}
