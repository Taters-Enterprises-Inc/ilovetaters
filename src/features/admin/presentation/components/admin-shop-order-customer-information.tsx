import { useAppSelector } from "features/config/hooks";
import { selectGetAdminShopOrder } from "../slices/get-admin-shop-order.slice";
import { ADMIN_SNACKSHOP_ORDER_STATUS } from "features/shared/constants";

export function AdminShopOrderCustomerInformation() {
  const getAdminShopOrderState = useAppSelector(selectGetAdminShopOrder);

  return (
    <div className="pt-1  text-secondary">
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
                className=" text-xs rounded-full py-1 px-2"
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

        <div className="grid-cols-2 gap-4 lg:grid">
          <div>
            <strong>Order Status:</strong>{" "}
            <span className="font-semibold">Product Received by Customer</span>
          </div>
          <div>
            <strong>Invoice Number:</strong>{" "}
            <span className="font-semibold">
              {getAdminShopOrderState.data?.invoice_num ?? "N/A"}
            </span>
          </div>
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

        <table className="hidden w-full mt-3 text-sm text-left rounded-lg lg:block">
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
            <tr className="bg-white">
              <th scope="row" className="px-6 py-4 font-medium text-secondary">
                Family Superpop Ziplock Bags , US Kernels popped and flavored
                into perfection • 140g(per pack), 2 to 3 servings per Family
                Pack • 280g(per pack), 4 to 6 servings per Party Pack Additional
                Melted Butter suggestions: • Family Pack: 4 Laddles • Party
                Pack: 6 Laddles
              </th>
              <td className="px-6 py-4">Sour Cream</td>
              <td className="px-6 py-4">3</td>
              <td className="px-6 py-4">₱125.00</td>
              <td className="px-6 py-4">₱375.00</td>
            </tr>
            <tr className="bg-gray-300">
              <th scope="row" className="px-6 py-4 font-medium text-secondary">
                Family Superpop Ziplock Bags , US Kernels popped and flavored
                into perfection • 140g(per pack), 2 to 3 servings per Family
                Pack • 280g(per pack), 4 to 6 servings per Party Pack Additional
                Melted Butter suggestions: • Family Pack: 4 Laddles • Party
                Pack: 6 Laddles
              </th>
              <td className="px-6 py-4">Texan Barbecue</td>
              <td className="px-6 py-4">3</td>
              <td className="px-6 py-4">₱125.00</td>
              <td className="px-6 py-4">₱375.00</td>
            </tr>
            <tr className="bg-white">
              <td colSpan={4} className="px-6 py-2 font-bold text-end">
                Total:
              </td>
              <td className="px-6 py-2">₱375.00</td>
            </tr>
            <tr className="bg-gray-300">
              <td colSpan={4} className="px-6 py-2 font-bold text-end">
                Code[ ] Voucher Discount:
              </td>
              <td className="px-6 py-2">₱375.00</td>
            </tr>
            <tr className="bg-white">
              <td colSpan={4} className="px-6 py-2 font-bold text-end">
                Gift Card No.[ 0 ]:
              </td>
              <td className="px-6 py-2">₱375.00</td>
            </tr>
            <tr className="bg-gray-300">
              <td colSpan={4} className="px-6 py-2 font-bold text-end">
                Subtotal:
              </td>
              <td className="px-6 py-2">₱375.00</td>
            </tr>
            <tr className="bg-white">
              <td colSpan={4} className="px-6 py-2 font-bold text-end">
                Delivery Fee:
              </td>
              <td className="px-6 py-2">₱375.00</td>
            </tr>
            <tr className="bg-gray-300">
              <td colSpan={4} className="px-6 py-2 font-bold text-end">
                COD Additional Charges:
              </td>
              <td className="px-6 py-2">₱375.00</td>
            </tr>
            <tr className="bg-white">
              <td colSpan={4} className="px-6 py-2 font-bold text-end">
                Grand Total:
              </td>
              <td className="px-6 py-2">₱375.00</td>
            </tr>
          </tbody>
        </table>

        <div className="lg:hidden">
          <div className="py-2 border-b">
            <p className="mb-2 text-xs leading-1 text-semibold">
              Family Superpop Ziplock Bags , US Kernels popped and flavored into
              perfection • 140g(per pack), 2 to 3 servings per Family Pack •
              280g(per pack), 4 to 6 servings per Party Pack Additional Melted
              Butter suggestions: • Family Pack: 4 Laddles • Party Pack: 6
              Laddles
            </p>
            <div className="flex justify-between">
              <span className="text-xs font-bold">Remarks:</span>
              <span className="text-xs">Sour Cream</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-bold">Quantity:</span>
              <span className="text-xs">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-bold">Price:</span>
              <span className="text-xs">₱375.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-bold">Total:</span>
              <span className="text-xs">₱375.00</span>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-bold">Total: </span>
            <span className="text-sm text-end">₱375.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-bold">Code[ ] Voucher Discount:</span>
            <span className="text-sm text-end">₱375.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-bold">Gift Card No.[ 0 ]:</span>
            <span className="text-sm text-end">₱375.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-bold">Subtotal:</span>
            <span className="text-sm text-end">₱375.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-bold">Delivery Fee:</span>
            <span className="text-sm text-end">₱375.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-bold">COD Additional Charges:</span>
            <span className="text-sm text-end">₱375.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-bold">Grand Total:</span>
            <span className="text-sm text-end">₱375.00</span>
          </div>
        </div>

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
